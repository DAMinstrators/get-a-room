'use strict';
const Sequelize = require('sequelize');
//Necessary to setup your database connection, default database is get_a_room
const sequelize = new Sequelize('get_a_room', 'root'/*database user*/, '2323'/*password*/);
const moment = require('moment');

const db = {};

db.createUser = (user) =>{
  return User.findOne({where: {name: user.username}})
    .then((usr) =>{
      if(usr !== null) return 'exists';
      return User.create({name: user.username, githubHandle: user.github, password: user.password})
    });
};

db.validateUser = (user) =>{
    return User.findOne({where: {name: user.username}})
      .then((usr) =>{
        if(usr === null) return false;
        if(usr.password !== user.password ){
          return 'Some fields are filled out incorrectly.';
        }
        return true;
      });
};

db.getRoomByName = (name) =>{
  return Room.findOne({'name': name});
};

db.getRooms = () =>{
  return Room.findAll();
};

db.getReservationsToday = (name) =>{
  let date = moment().format();

  return Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0).subtract(1, 'd');
    let end = moment(date).seconds(0).minutes(0).hour(0).add(1, 'd');

    return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getReservationsTomorrow = (name) =>{
  let date = moment().format();

  return Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0);
    let end = moment(date).seconds(0).minutes(0).hour(0).add(2, 'd');

    return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getReservationsByDate = (input) =>{
  return Room.findOne({where: {'name': input.name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(input.date, 'MM-DD-YYYY').subtract(1, 'd').format();
    let end = moment(input.date, 'MM-DD-YYYY').add(1, 'd').format();

    return Reservation.findAll({where: {roomId: rm.id, startTime: { $gt: begin, $lt: end}}});
  });
};

db.getRoomReservations = (name)=> {
  return Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";
    return Reservation.findAll({where: {roomId: rm.id}});
  });
};

db.getReservationByNameDateTime = (input) =>{
  return Room.findOne({where: {name: input.name}}).then((rm) =>{ //find roomId from given name
    if(rm === null) return "Room doesn't exist.";
    return Reservation.findOne({where: {roomId: rm.id, startTime: input.startTime}});
  });
};

db.createRoom = (room) =>{
  return Room.findOne({where: {name: room.name}})
    .then((rm) =>{
        if(rm !== null) return 'Room already exists.';
        return Room.create({name: room.name, capacity: room.capacity, accessGroupId: room.accessGroupId});
    });
};

db.addReservation = (rsvp) =>{
  return Room.findOne({where: {name: rsvp.roomName}}).then((rm) =>{
    if(rm === null){ return;}

    let date = moment(rsvp.date, 'MM-DD-YYYY').hour(rsvp.startTime).minutes(0).seconds(0).format();

    return User.findOne({where: {name: rsvp.userName}})
      .then((usr) =>{
        if(usr === null) return ('User does not exist.');
        return Reservation.create({startTime: date, userId: usr.id, roomId: rm.id});
      });
  });
};

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

User.sync();
AccessGroup.sync();
Room.sync();
Reservation.sync();
UserAccessGroup.sync();

module.exports = db;
