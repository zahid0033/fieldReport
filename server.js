const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
var session = require('express-session');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'ejs');

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.locals.type = req.session.type;
  res.locals.user_id = req.session.user_id;
  next();
});
// PD
const pdRoute= require('./routes/pd');
app.use('/pd',pdRoute);

// AD
const adRoute= require('./routes/ad');
app.use('/ad',adRoute);

// DD
const ddRoute= require('./routes/dd');
app.use('/dd',ddRoute);

// Upazilla
const upazillaRoute= require('./routes/upazilla');
app.use('/upazilla',upazillaRoute);

// simple route
app.get("/", (req, res) => {
  res.render('index', { title: 'Field Trial Software',msg:'' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.sequelize.sync();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});