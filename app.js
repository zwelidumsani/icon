var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session  = require('express-session')
var MongoStore  = require('connect-mongo')(session)
var mongoClient = require('mongoose')
var flash = require('connect-flash')
var nodemailer = require('nodemailer');
var http = require('http');
var csrf = require('csurf');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
var app = express();
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use('/building-constractors', express.static(__dirname + '/pdf/Building Contractors.pdf'));
app.use('/certificate-of-membership', express.static(__dirname + '/pdf/Certificate Of Membership.pdf'));
app.use('/civil-work-contractors', express.static(__dirname + '/pdf/Civil Work Contractors.pdf')); 
app.use('/building-specialist-contractor', express.static(__dirname + '/pdf/Building Specialist Contractor.pdf'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({secret: 'mySuperSecret',
 resave: false,
 saveUninitialized: false,
 Store: new MongoStore({mongooseConnection: mongoClient.connection}),
 cookie: {maxAge: 14*24*60*60*1000}
 }));
app.use(flash());
//app.use(require('cookie-parser')(credentials.cookieSecret));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
