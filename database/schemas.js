'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tqgqhyre', 'tqgqhyre', 'SRgfpU6w8a1h1zwhkkgyDyAMOuyZJWKI', {
  host: 'elmer.db.elephantsql.com',
  dialect: 'postgres'
})

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
  accessGroupId: Sequelize.INTEGER,
  capacity: Sequelize.INTEGER,
  coordinates: Sequelize.STRING,
  color: Sequelize.STRING,
});

const Reservation = sequelize.define('reservation', {
  roomId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  startTime: Sequelize.DATE,
  endTime: Sequelize.DATE
});

const UserAccessGroup = sequelize.define('userAccess', {
  userId: Sequelize.INTEGER,
  accessGroupId: Sequelize.INTEGER
});

module.exports = {
  User,
  AccessGroup,
  Room,
  Reservation,
  UserAccessGroup
}

// module.exports.User = User;
// module.exports.AccessGroup = AccessGroup;
// module.exports.Room = Room;
// module.exports.Reservation = Reservation;
// module.exports.UserAccessGroup = UserAccessGroup;
