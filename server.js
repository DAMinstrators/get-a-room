var express = require('express');
var static = require('express-static');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.use(static(__dirname + '/public/'));

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})