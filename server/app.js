//FUNCION PARA MANEJAR ERRORES
//var createError = require('http-errors');
import createError from 'http-errors';

//IMPORTA EL FRAMEWORK ESPRESS
//var express = require('express');
import express from 'express';

//IMPORTA MODULOS PARA MANEJAR RUTAS
//var path = require('path');
import path from 'node:path';

//SIRVE PARA COOKES
//var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';

//NOS SIRVE PARA REGISTRAR TODO LO QUE SIRVE EN EL SERVIDOR
//var logger = require('morgan');
import logger from 'morgan';

// SE IMPORTN LAS RUTAS DE LA APLICACION
//var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js';
//var usersRouter = require('./routes/users');
import usersRouter from './routes/users.js';

//import para crear Dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

//creando las vaariables 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//CREAR LA APLICACION EXPRESS
var app = express();

// CONFIGURA EL MOTOR DE VISTAS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// CONFIGURA EL USO DE MIDDLEWARES 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//CONFIGURACIONDE LA CARPETA DE ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, '..','public')));

//REGISTRAMOS RUTAS
app.use('/', indexRouter);
app.use('/users', usersRouter);

// CAPTURAMOS LOS ERRORES COMO EL 
app.use(function(req, res, next) {
  next(createError(404));
});

// MANEJO DE ERRORES
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;
