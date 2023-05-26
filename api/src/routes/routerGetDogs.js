const { Router } = require('express');
const routerGetDogs = Router();

//Importo los controladres
const getDogs = require('../controllers/getDogs');



// Todos los dogs para las Cards de a 8
routerGetDogs.get('/', async(req, res) => {
    try {
        const {page,order} = req.query;
        console.log(page,order)
        
        dogsInfo = await getDogs(page,order);

        res.status(200).json(dogsInfo);

    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = routerGetDogs;