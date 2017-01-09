'use strict';
const express = require('express');
const path = require('path');
const db = require('./database/db');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

/*
  Access the db file in the database directory to alter Sequelize code
  Quick Reference:
  -------------------------------------------
  (route) ----> (intended return)
  GET
  /rooms/:name/reservations/today ----> A named room's reservations for the current day
  /rooms/:name/reservations/tomorrow ----> A named room's reservations for tomorrow's date
  /rooms/:name/:date ----> A named room's reservations for a given date
  /rooms/:name/:date/:startTime ----> A reservation that matches the given room name, date, and startTime
  /rooms/:name/reservations ----> All reservations from a single named room
  /rooms ----> All rooms currently saved
  /rooms/:name ----> A named room

  POST
  /room ----> Creates a room under valid conditions and returns the instance
  /reservation ----> Creates a reservation under valid conditions and returns the instance
  /user/create ----> Creates a user under valid conditions and returns the instance
  /user/validate ----> Responds true or false conditioned on a user's credentials
*/


app.use(cors());
// app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

///////////
// USER ROUTING
///////////

app.post('/user/create', (req, res) =>{
  db.createUser(req.body)
    .then((user) =>{
      res.json(user);
    });
});

app.post('/user/validate', (req, res) =>{
  db.validateUser(req.body)
    .then((user) =>{
      res.json(user);
    });
});

app.get('/users', (req, res) =>{
  db.getUsers().then((users) =>{
    res.json(users);
  });
});

///////////////////
// BUILDING ROUTING
///////////////////

app.post('/building', (req,res)=>{
  db.createBuilding(req.body).then((building) =>{
    res.json(building);
  });
});

app.get('/buildings', (req, res) =>{
  db.getBuildings().then((buildings) =>{
    res.json(buildings);
  });
});

app.get('/buildings/:name', (req, res) =>{
  db.getBuildingByName(req.params.name).then((building) =>{
    res.json(building);
  });
});


/////////////////////
//RESERVATION ROUTING
/////////////////////

app.post('/reservation', (req,res)=>{
  console.log("Reservation body" , req.body)
  db.addReservation(req.body).then((rsvp) =>{
    res.json(rsvp);
  });
});

app.get('/reservations', (req, res) =>{
  db.getAllReservations().then((rsvps) =>{
    res.json(rsvps);
  });
});

app.get('/reservations/:building', (req, res) =>{
  db.getReservations(req.params, req.query ).then((rsvps) =>{
    res.json(rsvps);
  });

});

///////////////
// ROOM ROUTING
// TO BE DELETED UPON REFACTORING
///////////////


app.get('/rooms/:name/reservations/today', (req, res) =>{
    db.getReservationsToday(req.params.name)
      .then((rsvps) =>{
        res.json(rsvps);
      });
});

app.get('/rooms/:name/reservations/tomorrow', (req, res) =>{
  db.getReservationsTomorrow(req.params.name)
    .then((rsvps) =>{
      res.json(rsvps);
    });
});

//The date is parsed here to a correct format, minutes and seconds are set to 0
app.get('/rooms/:name/:date/:startTime', (req, res) =>{
  let date = req.params.date.split('-');
  let startTime = new Date('');

  //MM-DD-YYYY to YYYY-MM-DD
  startTime.setMonth(date[0] - 1);
  startTime.setDate(date[1]);
  startTime.setYear(date[2]);
  startTime.setUTCHours(req.params.startTime);

  db.getReservationByNameDateTime({name: req.params.name, startTime: startTime})
    .then((room) =>{
      if(room === null){
         res.json('false');
      }else{
        res.json({'room': room});
      }
      return;
    });
});

app.get('/rooms/:name/:date', (req, res) =>{
  db.getReservationsByDate({name: req.params.name, date: req.params.date})
    .then((rooms) =>{
      res.json(rooms);
    });
});

app.get('/rooms/:name/reservations', (req, res) =>{

  db.getRoomReservations(req.params.name)
    .then((rsvps) =>{
      res.json(rsvps);
    });
});

app.get('/rooms', (req, res) =>{
  db.getRooms().then((rooms) =>{
    res.json(rooms);
  });
});

app.get('/rooms/:name', (req, res) =>{
  db.getRoomByName(req.params.name).then((room) =>{
    res.json(room);
  });
});

app.post('/room', (req,res)=>{
  db.createRoom(req.body).then((room) =>{
    res.json(room);
  });
});


app.post('/createBuilding', (req, res) => {

})

app.listen(3000, function () {
   console.log("...listening on port 3000");
});
