const express = require('express');
const { auth } = require('../middleware/auth');
const { Event } = require('../models');
const router = express.Router();

router.use(auth);

// Create event
router.post('/', async (req, res) => {
  const { title, startTime, endTime } = req.body;
  if(!title||!startTime||!endTime) return res.status(400).json({ error: 'Missing fields' });
  const ev = await Event.create({ title, startTime, endTime, userId: req.user.id });
  res.json(ev);
});

// Read my events
router.get('/', async (req, res) => {
  const evs = await Event.findAll({ where: { userId: req.user.id }});
  res.json(evs);
});

// Update event status (e.g., make swappable)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, title, startTime, endTime } = req.body;
  const ev = await Event.findByPk(id);
  if(!ev || ev.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  if(status) ev.status = status;
  if(title) ev.title = title;
  if(startTime) ev.startTime = startTime;
  if(endTime) ev.endTime = endTime;
  await ev.save();
  res.json(ev);
});

// Delete
router.delete('/:id', async (req,res)=>{
  const ev = await Event.findByPk(req.params.id);
  if(!ev || ev.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  await ev.destroy();
  res.json({ ok: true });
});

module.exports = router;
