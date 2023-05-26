const { Router } = require('express');
const routerFilterDogs = Router();

//Importo los controladres
const filterDogsTemp = require('../controllers/filterDogsTemp');



// Todos los dogs filtrados por TEMPERAMENTO------------------------------------

routerFilterDogs.get('/', async(req, res) => {
    try {
        let {page,temp,dogsFrom} = req.query;

        if(!page || !temp || !dogsFrom) throw Error ('Faltan Datos')

        filteredInfo = await filterDogsTemp(parseInt(page),temp,dogsFrom);
        res.status(200).json(filteredInfo);
        

    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = routerFilterDogs;