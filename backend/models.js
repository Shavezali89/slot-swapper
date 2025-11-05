const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull:false },
  email: { type: DataTypes.STRING, unique: true, allowNull:false },
  passwordHash: { type: DataTypes.STRING, allowNull:false }
});

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull:false },
  startTime: { type: DataTypes.DATE, allowNull:false },
  endTime: { type: DataTypes.DATE, allowNull:false },
  status: { type: DataTypes.ENUM('BUSY','SWAPPABLE','SWAP_PENDING'), defaultValue: 'BUSY' }
});

const SwapRequest = sequelize.define('SwapRequest', {
  status: { type: DataTypes.ENUM('PENDING','ACCEPTED','REJECTED'), defaultValue: 'PENDING' }
});

// Relations
User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(SwapRequest, { foreignKey: 'requesterId', as: 'outgoingRequests' });
User.hasMany(SwapRequest, { foreignKey: 'responderId', as: 'incomingRequests' });

SwapRequest.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
SwapRequest.belongsTo(User, { foreignKey: 'responderId', as: 'responder' });

SwapRequest.belongsTo(Event, { foreignKey: 'mySlotId', as: 'mySlot' });
SwapRequest.belongsTo(Event, { foreignKey: 'theirSlotId', as: 'theirSlot' });

module.exports = { sequelize, User, Event, SwapRequest };
