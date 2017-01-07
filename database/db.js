'use strict';
const schemas = require('./schemas');
// const Sequelize = require('sequelize');
// //Necessary to setup your database connection, default database is get_a_room
// const sequelize = new Sequelize('tqgqhyre', 'tqgqhyre', 'SRgfpU6w8a1h1zwhkkgyDyAMOuyZJWKI', {
//   host: 'elmer.db.elephantsql.com',
//   dialect: 'postgres'
// })

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

const moment = require('moment');
const db = {};

db.createUser = (user) =>{
  return schemas.User.findOne({where: {name: user.username}})
    .then((usr) =>{
      if(usr !== null) return 'exists';
      return User.create({name: user.username, githubHandle: user.github, password: user.password})
    });
};

db.validateUser = (user) =>{
    return schemas.User.findOne({where: {name: user.username}})
      .then((usr) =>{
        if(usr === null) return false;
        if(usr.password !== user.password ){
          return 'Some fields are filled out incorrectly.';
        }
        return true;
      });
};

db.getRoomByName = (name) =>{
  return schemas.Room.findOne({'name': name});
};

db.getRooms = () =>{
  return schemas.Room.findAll();
};

db.getReservationsToday = (name) =>{
  let date = moment().format();

  return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0).subtract(1, 'd');
    let end = moment(date).seconds(0).minutes(0).hour(0).add(1, 'd');

    return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getReservationsTomorrow = (name) =>{
  let date = moment().format();

  return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(date).seconds(0).minutes(0).hour(0);
    let end = moment(date).seconds(0).minutes(0).hour(0).add(2, 'd');

    return schemas.Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
  });


};

db.getReservationsByDate = (input) =>{
  return schemas.Room.findOne({where: {'name': input.name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";

    let begin = moment(input.date, 'MM-DD-YYYY').subtract(1, 'd').format();
    let end = moment(input.date, 'MM-DD-YYYY').add(1, 'd').format();

    return schemas.Reservation.findAll({where: {roomId: rm.id, startTime: { $gt: begin, $lt: end}}});
  });
};

db.getRoomReservations = (name)=> {
  return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
    if(rm === null) return "Room doesn't exist.";
    return schemas.Reservation.findAll({where: {roomId: rm.id}});
  });
};

db.getReservationByNameDateTime = (input) =>{
  return schemas.Room.findOne({where: {name: input.name}}).then((rm) =>{ //find roomId from given name
    if(rm === null) return "Room doesn't exist.";
    return schemas.Reservation.findOne({where: {roomId: rm.id, startTime: input.startTime}});
  });
};

db.createRoom = (room) =>{
  return schemas.Room.findOne({where: {name: room.name}})
    .then((rm) =>{
        if(rm !== null) return 'Room already exists.';
        return schemas.Room.create({name: room.name, capacity: room.capacity, accessGroupId: room.accessGroupId});
    });
};

db.addReservation = (rsvp) =>{
  return schemas.Room.findOne({where: {name: rsvp.roomName}}).then((rm) =>{
    if(rm === null){ return;}

    let date = moment(rsvp.date, 'MM-DD-YYYY').hour(rsvp.startTime).minutes(0).seconds(0).format();

    return schemas.User.findOne({where: {name: rsvp.userName}})
      .then((usr) =>{
        if(usr === null) return ('User does not exist.');
        return schemas.Reservation.create({startTime: date, userId: usr.id, roomId: rm.id});
      });
  });
};

schemas.User.sync();
schemas.AccessGroup.sync();
schemas.Room.sync();
schemas.Reservation.sync();
schemas.UserAccessGroup.sync();

module.exports = db;
