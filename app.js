var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//load routes
var index = require('./routes/index');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var purchases = require('./routes/purchases');
var stock = require('./routes/stock');
var recipes = require('./routes/recipes');
var production = require('./routes/production');
var sales = require('./routes/sales');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set URLs
app.use('/', index);
app.use('/login', login);
app.use('/register', login);
app.use('/dashboard', dashboard);
app.use('/compras', purchases);
app.use('/estoque', stock);
app.use('/receitas', recipes);
app.use('/producao', production);
app.use('/vendas', sales);

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
  res.render('error');
});

module.exports = app;
