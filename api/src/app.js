const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routerByDog = require('./routes/routerByDog');
const routerTempAndName = require('./routes/routerTempAndName');
const routerGetDogs = require('./routes/routerGetDogs')
const routerFilterDogs = require ('./routes/routesFilterDogs');
const routerUser = require('./routes/routerUser');


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://vercel.com/zeduard89/deploy-henry-dogs'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Rutas
server.use('/', routerTempAndName);   // Temperamentos - Names - Imagenes para la DB
server.use('/', routerByDog);         // ById - ByName - ByBreedGroup -  CreateDB

server.use('/getDogs', routerGetDogs); // AllDogs(DByAPI) 8 HOME con filtros ABC CBA y pesos MAX
server.use('/filterDogs', routerFilterDogs); // Dogs by Temperamentos 8

server.use('/user', routerUser);      // LogIn - Register - Actualizar - Borrar Usuario (solo uso LOGIN y REGISTER)


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
