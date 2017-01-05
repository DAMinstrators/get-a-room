'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('get_a_room', 'root', '2323');
const moment = require('moment');

const db = {};

db.getRoomByName = (name) =>{
  return Room.findOne({'name': name});
};

db.getRooms = () =>{
  return Room.findAll();
};

db.getRoomToday = (name) =>{
  let date = moment().format();

  return Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0).subtract(1, 'd');
    let end = moment(date).seconds(0).minutes(0).hour(0).add(1, 'd');

    return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getRoomTomorrow = (name) =>{
  let date = moment().format();

  return Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0);
    let end = moment(date).seconds(0).minutes(0).hour(0).add(2, 'd');

    return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getRoomByDate = (input) =>{
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

db.getRoomByNameDateTime = (input) =>{
  return Room.findOne({where: {name: input.name}}).then((rm) =>{ //find roomId from given name
    if(rm === null) return "Room doesn't exist.";
    return Reservation.findOne({where: {roomId: rm.id, startTime: input.startTime}});
  });
};

db.createRoom = (room) =>{
  return Room.findOrCreate({where: room});
};

db.addReservation = (rsvp) =>{
  return Room.findOne({where: {name: rsvp.name}}).then((rm) =>{
    if(rm !== null){ return;}
    console.log('rsvp', rsvp);
    let date = moment(rsvp.date, 'MM-DD-YYYY').format();
    date.hour(rsvp.startTime);
    ///DANGER!!!!!!!!!!!!!!!!!!!!!!!!!!! enter correct userId
    return Reservation.create({'date': date, userId: 1, roomId: rm.id});
  });
};

db.createUser = (user) =>{
  return User.findOrCreate({where: user});
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

// let startTime = new Date('');
//
// startTime.setYear(2016);
// startTime.setMonth(10);
// startTime.setDate(4);
// startTime.setUTCHours(15);
//
// console.log('startTime:', startTime);
// db.addReservation({roomId: 2, startTime: startTime});

module.exports = db;