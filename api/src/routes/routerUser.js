const { Router } = require('express');
const routerUser = Router();

//Importo los controladres
const getAllUsers = require('../controllers/userControllers/getAllUsers')
const postUser = require('../controllers/userControllers/postUser')
const updateUser = require('../controllers/userControllers/updateUser')
const deleteUser = require('../controllers/userControllers/deleteUser')


// Busco EL Usuario (si exite el usuario TRUE sino FALSE)
routerUser.post('/login', async(req, res) => { 
    try {
        
        const {userData} = req.body;
        let name = userData.name;
        let email = userData.email;
        let password = userData.password;

        if(!name || !email || !password) throw Error ('Los datos ingresados son Incorrectamente')
        const access = await getAllUsers(name,email,password);
        
        res.status(200).json(access);

    } catch (error) {
        res.status(404).send(error.message);
    }
})


//CREO usuario EMAIL es UNIQUE  //Devuelvo String para poder usarlo en el FORM. 
routerUser.post('/register/', async(req, res) => {
    try {
        
        const {userData} = req.body;
        let name = userData.name;
        let email = userData.email;
        let password = userData.password;
        
        if (!name) throw Error ('Un nombre es requerido')
        if(name.length < 6) throw Error ('Ingrese un nombre mayor a 5 caracteres')
        if (!email) throw Error ('Por favor ingrese un Email');
        if(!/\S+@\S+\.\S+/.test(email)) throw Error ('Utilize un email valido');
        if(!password) throw Error ('Por favor ingrese un Password');
        if(password.length < 6) throw Error ('Su password tiene que tener al menos 6 caracteres');

        const newUser = await postUser(name,email,password);

        res.status(200).send(newUser);
        

    } catch (error) {
        res.status(404).send(error.message);
    }
})

//Actualizo usuario solo EMAIL, segurar NULA
routerUser.put('/', async(req, res) => {
    try {
        
        const{ name , email, password }  = req.body;
        if(!name || !email || !password) throw Error ('Datos Ingresados Incorrectamente')

        const newUser = await updateUser(name,email,password);


        res.status(200).send({message:`Update Exitoso  del usuario ${newUser.email}`});
        

        
    } catch (error) {

        res.status(400).send(error.message);
    }
})

//Borro Usuario, Necesito los 3 datos que coincidan con la DB
routerUser.delete('/', async(req, res) => {  
    try {   
        const{ name , email, password }  = req.body;
        if(!name || !email || !password) throw Error ('Datos Ingresados Incorrectamente')

        const deletedUser = await deleteUser(name,email,password);

        res.status(200).send(deletedUser);

        
    } catch (error) {

        res.status(400).send(error.message);
    }
})

module.exports = routerUser;