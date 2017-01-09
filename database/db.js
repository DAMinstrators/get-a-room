'use strict';
const schemas = require('./schemas');
const moment = require('moment');
const db = {};

////////////
//USER TABLE 
////////////

db.createUser = (user) => {
  return schemas.User.findOne({where: {name: user.username}})
    .then((usr) =>{
      if(usr !== null) return 'exists';
      return schemas.User.create({name: user.username, githubHandle: user.github, password: user.password})
    });
};

db.validateUser = (user) => {
    return schemas.User.findOne({where: {name: user.username}})
      .then((usr) =>{
        if(usr === null) return false;
        if(usr.password !== user.password ){
          return 'Some fields are filled out incorrectly.';
        }
        return true;
      });
};

db.getUsers = () => {
  return schemas.User.findAll();
};

/////////////////
// BUILDING TABLE
/////////////////
db.createBuilding = (building) =>{
  return schemas.Building.findOne({where: {name: building.name}})
    .then((rm) =>{
        if(rm !== null) return 'Building already exists.';
        return schemas.Building.create({name: building.name, rooms: building.rooms, password: building.password, admin: building.admin});
    });
};

db.getBuildings = () => {
  return schemas.Building.findAll();
};

db.getBuildingByName = (name) => {
  return schemas.Building.findOne({where: {name: name}});
};

////////////////////
// RESERVATION TABLE
////////////////////

db.addReservation = (rsvp) =>{
  return schemas.Room.findOne({where: {name: rsvp.room}}).then((rm) =>{
    if(rm === null){ return ('Room does not exist.');}
    // let date = moment(rsvp.date, 'MM-DD-YYYY').hour(rsvp.startTime).minutes(0).seconds(0).format();
    return schemas.User.findOne({where: {name: rsvp.createdBy}})
      .then((usr) =>{
        if(usr === null) return ('User does not exist.');
        return schemas.Reservation
        .create({startTime: rsvp.date,
                 userId: usr.id,
                 roomId: rm.id,
                 createdBy: usr.name,
                 building: rsvp.building,
                 room:rsvp.room,
                 date:rsvp.date,
                 start:rsvp.start,
                 end:rsvp.end,
                 description: rsvp.description});
      });
  });
};

db.getAllReservations = () => {
  return schemas.Reservation.findAll();
}

db.getReservations = (params, querys) => {
//CHECK FOR BUILDING PARAM
console.log("Params", params, 'Querys', querys)
if (params.building && querys.date && querys.room){
  return schemas.Reservation.findAll({where: {building: params.building, room:querys.room, date:querys.date}})
};

if (params.building && querys.room){
  return schemas.Reservation.findAll({where: {building: params.building, room:querys.room}})
};
if (params.building && querys.date){
  return schemas.Reservation.findAll({where: {building: params.building, date:querys.date}})
};

if (params.building){
  return schemas.Reservation.findAll({where: {building: params.building}})
};
}

//////////////////
// ROOM TABLE
// TO BE DELETED UPON REFACTORING
//////////////////
db.createRoom = (room) =>{
  return schemas.Room.findOne({where: {name: room.name}})
    .then((rm) =>{
        if(rm !== null) return 'Room already exists.';
        return schemas.Room.create({name: room.name, capacity: room.capacity, accessGroupId: room.accessGroupId});
    });
};

db.getRoomByName = (name) => {
  return schemas.Room.findOne({where: {name: name}});
};

db.getRooms = () =>{
  return schemas.Room.findAll();
};


schemas.User.sync();
schemas.Building.sync();
schemas.Reservation.sync();
schemas.Room.sync();
// schemas.AccessGroup.sync();
// schemas.UserAccessGroup.sync();

module.exports = db;



// OLD CODE:

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


// PRE-EXISING
// db.getReservationsToday = (name) =>{
//   let date = moment().format();

//   return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
//     if(rm === null) return "Room doesn't exist.";

//     let begin = moment(date).seconds(0).minutes(0).hour(0).subtract(1, 'd');
//     let end = moment(date).seconds(0).minutes(0).hour(0).add(1, 'd');

//     return Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
//   });


// };

// db.getReservationsTomorrow = (name) =>{
//   let date = moment().format();

//   return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
//     if(rm === null) return "Room doesn't exist.";

//     let begin = moment(date).seconds(0).minutes(0).hour(0);
//     let end = moment(date).seconds(0).minutes(0).hour(0).add(2, 'd');

//     return schemas.Reservation.findAll({where: {startTime: {$gt: begin, $lt: end}}});
//   });


// };

// db.getReservationsByDate = (input) =>{
//   return schemas.Room.findOne({where: {'name': input.name}}).then((rm) =>{
//     if(rm === null) return "Room doesn't exist.";

//     let begin = moment(input.date, 'MM-DD-YYYY').subtract(1, 'd').format();
//     let end = moment(input.date, 'MM-DD-YYYY').add(1, 'd').format();

//     return schemas.Reservation.findAll({where: {roomId: rm.id, startTime: { $gt: begin, $lt: end}}});
//   });
// };

// db.getRoomReservations = (name)=> {
//   return schemas.Room.findOne({where: {'name': name}}).then((rm) =>{
//     if(rm === null) return "Room doesn't exist.";
//     return schemas.Reservation.findAll({where: {roomId: rm.id}});
//   });
// };

// db.getReservationByNameDateTime = (input) =>{
//   return schemas.Room.findOne({where: {name: input.name}}).then((rm) =>{ //find roomId from given name
//     if(rm === null) return "Room doesn't exist.";
//     return schemas.Reservation.findOne({where: {roomId: rm.id, startTime: input.startTime}});
//   });
// };
