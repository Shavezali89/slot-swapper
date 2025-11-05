/*
 Run: npm install && npm run seed
 This creates two users and sample events to play with.
*/

const bcrypt = require('bcrypt');
const { sequelize, User, Event } = require('./models');

async function seed(){
  await sequelize.sync({ force: true });
  const a = await User.create({ name: 'Alice', email: 'alice@example.com', passwordHash: await bcrypt.hash('alice123',10) });
  const b = await User.create({ name: 'Bob', email: 'bob@example.com', passwordHash: await bcrypt.hash('bob123',10) });

  await Event.bulkCreate([
    { title: 'Team Meeting', startTime: new Date('2025-11-10T10:00:00'), endTime: new Date('2025-11-10T11:00:00'), status: 'BUSY', userId: a.id },
    { title: 'Focus Block', startTime: new Date('2025-11-12T14:00:00'), endTime: new Date('2025-11-12T15:00:00'), status: 'SWAPPABLE', userId: b.id },
    { title: 'One-on-one', startTime: new Date('2025-11-11T09:00:00'), endTime: new Date('2025-11-11T09:30:00'), status: 'SWAPPABLE', userId: a.id },
  ]);
  console.log('Seeded');
  process.exit();
}

seed();
