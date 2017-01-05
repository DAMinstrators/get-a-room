'use strict';
const express = require('express');
const app = express();
const db = require('db');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname + '/src')));
app.use(bodyParser());

app.get('/', (req, res)=>{
  console.log(db);
});

app.post('/user', (req, res) =>{
  res.json(db.createUser(req.body));
});

app.post('/room', (req,res)=>{
  res.json(db.createRoom(req.body));
});

app.post('/reservation', (req,res)=>{
  res.json(db.addRoom(req.body));
});
