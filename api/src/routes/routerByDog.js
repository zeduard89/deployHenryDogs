const { Router } = require('express');
const routerByDog = Router();

//Importo los controladres
//const getDogs = require('../controllers/getDogs');
const getDogsById = require('../controllers/getDogsById');
const getDogByName = require('../controllers/getDogByName');
const getByRaza = require('../controllers/getByRaza');
const postDogs = require('../controllers/postDogs');



// Traigo por Id, Detalle de una raza espefica (funciona tanto para api como DB) HOME
routerByDog.get('/dogs/detail/:id', async(req, res) => {

        try {  
        const{id} = req.params // 123
        
        const dogInfo = await getDogsById(id);
        res.status(200).json(dogInfo);
        
        } catch (error) {

        res.status(400).send(error.message);
        } 
})

//Params 'name' busca DOGS componente SEARCHBAR
routerByDog.get('/dogs/name/:name', async(req, res) => {
    try {
        const {name} = req.params;
        if(name === 'seleccioneUno') throw Error ('Seleccion una opcion valida')
        const dogByName = await getDogByName(name);
        
        res.status(200).json(dogByName);
       
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Query 'breed_group' trae Todas las RAZAS que coinciden HOME
routerByDog.get('/dogs', async(req, res) => {
    try {
        const {breed_group} = req.query;

        const dogRaza = await getByRaza(breed_group);
        res.status(200).json(dogRaza);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Creo Perro y relaciono con Temperamentos
routerByDog.post('/dogs', async (req, res) => {
    try {
        const {dogInfo} = req.body;

        const createDogs = await postDogs(dogInfo);
        console.log(createDogs);
        res.status(200).json(createDogs)

    } catch (error) {
        res.status(400).send(error.message);
        
    }
})


module.exports = routerByDog;
