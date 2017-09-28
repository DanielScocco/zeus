var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var User = require("./models/user.js");

mongoose.connect('mongodb://zeusadm:22njdk918dkfjd@ds141464.mlab.com:41464/zeus1',{ useMongoClient: true });

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
app.use(flash());

//session and passport config
app.use(session({
    secret: 'hahamyfriend',
    name: 'zeus',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

//load routes
var index = require('./routes/index');
var login = require('./routes/login')(passport);
var register = require('./routes/register')(passport);
var logout = require('./routes/logout');
var dashboard = require('./routes/dashboard');
var purchases = require('./routes/purchases');
var stock = require('./routes/stock');
var recipes = require('./routes/recipes');
var production = require('./routes/production');
var sales = require('./routes/sales');
var products = require('./routes/products');
var saveProduct = require('./routes/saveProduct');
var savePurchase = require('./routes/savePurchase');
var stockEdit = require('./routes/stockEdit');
var saveStockEdit = require('./routes/saveStockEdit');
var saveRecipe = require('./routes/saveRecipe');

//set URLs
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/compras', purchases);
app.use('/estoque', stock);
app.use('/receitas', recipes);
app.use('/producao', production);
app.use('/vendas', sales);
app.use('/produtos', products);
app.use('/saveProduct', saveProduct);
app.use('/savePurchase', savePurchase);
app.use('/ajusteEstoque', stockEdit);
app.use('/saveStockEdit', saveStockEdit);
app.use('/saveRecipe', saveRecipe);

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
