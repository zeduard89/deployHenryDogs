const { Router } = require('express');
const routerTempAndName = Router();

//Importo los Controllers
const getApiTemperaments = require('../controllers/name/tempControllers/getApiTemperaments')
const getApiNames = require('../controllers/name/tempControllers/getApiNames')
const getApiImage = require('../controllers/name/tempControllers/getApiImage');
const getAllDBTemps = require('../controllers/name/tempControllers/getAllDBTemps');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//obtener todos los Temp de SIn harcodeo ni guardar en DB

//BUSCO LOS TEMPS DE LA API y LLENO LA DB
routerTempAndName.get('/temperaments', async(req, res) => {
    try {
        
        const allTemps = await getApiTemperaments();

        res.status(200).json(allTemps);

    } catch (error) {

        res.status(500).send(error.message);
    }
})

//OBTENGO LOS TEMPS de la DB
routerTempAndName.get('/getAllDBTemps', async(req, res) => {
    try {
        
        const allTemps = await getAllDBTemps();

        res.status(200).json(allTemps);

    } catch (error) {

        res.status(500).send(error.message);
    }
})

//OBTENGO LOS NAMES DE LA API y LLENO LA DB
routerTempAndName.get('/names', async(req, res) => {
    try {
        
        const allNames = await getApiNames();

        res.status(200).json(allNames);

    } catch (error) {

        res.status(500).send(error.message);
    }
})

//OBTENGO LAS IMAGENES DE LA API y LLENO LA DB
routerTempAndName.get('/imagenes', async(req, res) => {
    try {
        
        const allImage = await getApiImage();

        res.status(200).json(allImage);

    } catch (error) {

        res.status(500).send(error.message);
    }
})


module.exports = routerTempAndName;