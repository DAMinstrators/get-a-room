'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tqgqhyre', 'tqgqhyre', 'SRgfpU6w8a1h1zwhkkgyDyAMOuyZJWKI', {
  host: 'elmer.db.elephantsql.com',
  dialect: 'postgres'
})

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  githubHandle: Sequelize.STRING,
  password: Sequelize.STRING,
  // buildings: Sequelize.ARRAY[STRING]
});

const Building = sequelize.define('building', {
  name: Sequelize.STRING,
  rooms: Sequelize.JSON,
  password: Sequelize.STRING,
  admin: Sequelize.STRING,
});

const Reservation = sequelize.define('reservation', {
  //TO KEEP PRE-EXISTING FUNCTIONALIY
  roomId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  startTime: Sequelize.DATE,
  endTime: Sequelize.DATE,
  // NEW RENAMED FUNCTIONALIY
  createdBy: Sequelize.STRING,
  building: Sequelize.STRING,
  room: Sequelize.STRING,
  date: Sequelize.STRING,
  start: Sequelize.INTEGER,
  end: Sequelize.INTEGER,
  description: Sequelize.STRING,
});

const Room = sequelize.define('room', {
  name: Sequelize.STRING,
  accessGroupId: Sequelize.INTEGER,
  capacity: Sequelize.INTEGER,
  coordinates: Sequelize.STRING,
  color: Sequelize.STRING,
});

module.exports = {
  User,
  Building,
  // AccessGroup,
  Room,
  Reservation,
  // UserAccessGroup
}

// module.exports.User = User;
// module.exports.AccessGroup = AccessGroup;
// module.exports.Room = Room;
// module.exports.Reservation = Reservation;
// module.exports.UserAccessGroup = UserAccessGroup;

// const AccessGroup = sequelize.define('accessGroup', {
//   name: Sequelize.STRING,
//   accessLevel: Sequelize.STRING,
//   organization: Sequelize.STRING
// });

// const UserAccessGroup = sequelize.define('userAccess', {
//   userId: Sequelize.INTEGER,
//   accessGroupId: Sequelize.INTEGER
// });