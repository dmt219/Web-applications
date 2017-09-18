//Duc Tran
//dmt219

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();


var entries = {};
app.locals.entries = entries;

var nextId = 1;


var Task = function (description, type , date) {
	this.id = nextId++;
	this.description = description;
  this.type = type;
	this.date = date;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Note: extended:true

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/load", function(req, res) {
  res.send(entries);
});

app.post("/add", function(req, res) {
  var newTask = new Task(req.body.description, req.body.type,req.body.date);
  entries[newTask.id] = newTask;  
  res.send(entries);
});

app.post("/delete", function(req, res) {
  var xlist = req.body.xlist;
  xlist.forEach( (ele) => {delete entries[ele];} );
  res.send(entries);
});

app.use(function(req, res) {
  res.status(404).render("404");
});

// Fire up the server
app.listen(3000, function() {
  console.log("Express app started on port 3000.");
});