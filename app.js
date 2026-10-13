var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// GET / -> Home
app.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

// GET /historia
app.get('/historia', function(req, res) {
  res.render('historia', { title: 'Historia' });
});

// GET /novedades
app.get('/novedades', function(req, res) {
  res.render('novedades', { title: 'Novedades' });
});

// GET /nosotros
app.get('/nosotros', function(req, res) {
  res.render('nosotros', { title: 'Nosotros' });
});

// GET /testimonios
app.get('/testimonios', function(req, res) {
  res.render('testimonios', { title: 'Testimonios' });
});

// GET /contacto -> muestra el formulario
app.get('/contacto', function(req, res) {
  res.render('contacto', { title: 'Contactanos' });
});

// POST /contacto -> recibe los datos del formulario
app.post('/contacto', function(req, res) {
  var nombre = req.body.nombre || 'visitante';
  var mensaje = req.body.mensaje || '(sin mensaje)';
  res.render('gracias', { title: 'Mensaje enviado', nombre: nombre, mensaje: mensaje });
});

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
