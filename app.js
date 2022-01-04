var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var userRoute = require('./routes/user');
var SondageRoute = require('./routes/sondage');
var VoteRoute = require('./routes/vote');

var app = express();
const http = require('http').Server(app);
 const io = require('socket.io')(http);




console.log('in app.js')

/* Routers Imports */


/*--------------------*/

/* CORS Setup*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Methods', '*');
  
  next();
});


mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(passport.initialize());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res, next) {
  res.send(true).status(200);
});






/* Global routers */
app.use('/api/user', userRoute);
app.use('/api/sondage', SondageRoute);
app.use('/api/vote', VoteRoute);


/*--------------------*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
