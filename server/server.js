'use strict';

const express = require('express');
const path = require('path');
const db = require('./../database/db');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, './../public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/rooms/:name/reservations/today', (req, res) =>{
  console.log('pinging correct endpoint: ', req.params.name);
    db.getRoomToday(req.params.name)
      .then((rsvps) =>{
        res.json(rsvps);
      });
});

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

app.get('/rooms/:name/reservations/tomorrow', (req, res) =>{
  db.getRoomTomorrow(req.params.name)
    .then((rsvps) =>{
      res.json(rsvps);
    });
});

app.get('/rooms/:name/:date/:startTime', (req, res) =>{
  let date = req.params.date.split('-');
  let startTime = new Date('');

  startTime.setMonth(date[0] - 1);
  startTime.setDate(date[1]);
  startTime.setYear(date[2]);
  startTime.setUTCHours(req.params.startTime);

  db.getRoomByNameDateTime({name: req.params.name, startTime: startTime})
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
  db.getRoomByDate({name: req.params.name, date: req.params.date})
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
  db.getRoomByName().then((room) =>{
    res.json(room);
  });
});

app.post('/user', (req, res) =>{
  db.createUser(req.body).spread((user, created) =>{
    res.json( created ? user : created );
  });
});

app.post('/room', (req,res)=>{
  db.createRoom(req.body).then((room) =>{
    res.json(room);
  });
});

app.post('/reservation', (req,res)=>{
  db.addReservation(req.body).then((rsvp) =>{
    res.json(rsvp);
  });
});

app.listen(8080, function () {
   console.log("...listening on port 8080");
});
