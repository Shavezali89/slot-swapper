const express = require('express');
const { auth } = require('../middleware/auth');
const { Event, SwapRequest, sequelize, User } = require('../models');
const router = express.Router();

// GET /api/swappable-slots  -> list all SWAPPABLE slots not belonging to current user
router.get('/swappable-slots', auth, async (req, res) => {
  const slots = await Event.findAll({
    where: { status: 'SWAPPABLE' , userId: { [require('sequelize').Op.ne]: req.user.id } },
    include: [{ model: User, attributes: ['id','name','email'] }]
  });
  res.json(slots);
});

// POST /api/swap-request  { mySlotId, theirSlotId }
router.post('/swap-request', auth, async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;
  if(!mySlotId || !theirSlotId) return res.status(400).json({ error: 'Missing ids' });

  // Transaction to mark slots pending + create request
  await sequelize.transaction(async (t) => {
    const mySlot = await Event.findByPk(mySlotId, { transaction: t, lock: t.LOCK.UPDATE });
    const theirSlot = await Event.findByPk(theirSlotId, { transaction: t, lock: t.LOCK.UPDATE });

    if(!mySlot || mySlot.userId !== req.user.id) throw new Error('Invalid mySlot');
    if(!theirSlot) throw new Error('Their slot not found');

    if(mySlot.status !== 'SWAPPABLE' || theirSlot.status !== 'SWAPPABLE') throw new Error('One of slots not swappable');

    // set to pending
    mySlot.status = 'SWAP_PENDING';
    theirSlot.status = 'SWAP_PENDING';
    await mySlot.save({ transaction: t });
    await theirSlot.save({ transaction: t });

    const request = await SwapRequest.create({
      requesterId: req.user.id,
      responderId: theirSlot.userId,
      mySlotId: mySlot.id,
      theirSlotId: theirSlot.id,
      status: 'PENDING'
    }, { transaction: t });

    res.json(request);
  }).catch(e=>{
    res.status(400).json({ error: e.message });
  });
});

// POST /api/swap-response/:requestId  { accept: true/false }
router.post('/swap-response/:requestId', auth, async (req, res) => {
  const { requestId } = req.params;
  const { accept } = req.body;
  const request = await SwapRequest.findByPk(requestId);
  if(!request) return res.status(404).json({ error: 'Request not found' });
  if(request.responderId !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
  if(request.status !== 'PENDING') return res.status(400).json({ error: 'Request not pending' });

  await sequelize.transaction(async (t) => {
    const mySlot = await Event.findByPk(request.mySlotId, { transaction: t, lock: t.LOCK.UPDATE });
    const theirSlot = await Event.findByPk(request.theirSlotId, { transaction: t, lock: t.LOCK.UPDATE });

    if(accept){
      // swap owners
      const tmpOwner = mySlot.userId;
      mySlot.userId = theirSlot.userId;
      theirSlot.userId = tmpOwner;

      mySlot.status = 'BUSY';
      theirSlot.status = 'BUSY';
      await mySlot.save({ transaction: t });
      await theirSlot.save({ transaction: t });

      request.status = 'ACCEPTED';
      await request.save({ transaction: t });

      res.json({ ok: true, accepted: true });
    } else {
      // reject: set both back to SWAPPABLE
      mySlot.status = 'SWAPPABLE';
      theirSlot.status = 'SWAPPABLE';
      await mySlot.save({ transaction: t });
      await theirSlot.save({ transaction: t });

      request.status = 'REJECTED';
      await request.save({ transaction: t });

      res.json({ ok: true, accepted: false });
    }
  }).catch(e=>{
    res.status(400).json({ error: e.message });
  });
});

// Additional endpoints: incoming/outgoing requests
router.get('/requests', auth, async (req, res) => {
  const incoming = await SwapRequest.findAll({ where: { responderId: req.user.id }, include: ['mySlot','theirSlot'] });
  const outgoing = await SwapRequest.findAll({ where: { requesterId: req.user.id }, include: ['mySlot','theirSlot'] });
  res.json({ incoming, outgoing });
});

module.exports = router;
