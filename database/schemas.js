'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('get_a_room', 'root', '2323');

module.exports = ()=>{
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  githubHandle: Sequelize.STRING,
  password: Sequelize.STRING
});

const AccessGroup = sequelize.define('accessGroup', {
  name: Sequelize.STRING,
  accessLevel: Sequelize.STRING,
  organization: Sequelize.STRING
});

const Room = sequelize.define('room', {
  name: Sequelize.STRING,
  capacity: Sequelize.INTEGER,
  coordinates: Sequelize.STRING,
  color: Sequelize.STRING,
});

const Reservation = sequelize.define('reservation', {
  startTime: Sequelize.DATE,
  endTime: Sequelize.DATE
});

const UserAccessGroup = sequelize.define('userAccess', {
  userId: Sequelize.INTEGER,
  accessGroupId: Sequelize.INTEGER
});

User.sync();
AccessGroup.sync();
Room.sync();
Reservation.sync();
UserAccessGroup.sync();

return ()=>{};
};
