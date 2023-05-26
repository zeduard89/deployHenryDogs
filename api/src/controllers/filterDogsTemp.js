//const { Dogs } = require ('../models/Dogs');
require('dotenv').config();
const axios = require('axios');
const {Dog, Temperaments} = require('../db');

const filteredDogs = async (page,temp,dogsFrom) => {
    
try {

    const coma = ',';
    let i = 0;
    let limit = 8;
    let apiArray = [];
    let tempArray = [];
    temp= temp.toLowerCase().trim();

    // Busco en la DB, incluyo la tabla asociada----------------------------------------------------------------------------
    if(dogsFrom === 'DB'){
    let dbArray = await Dog.findAll({
      include: [{
        model: Temperaments,
        attributes: ["name"],       //solos los names
        through: { attributes: []}, //omito las datos de la otra tabla
      }],
    });

    //Copio los datos de DATAVALUES y le agrego los temperamentos q lo tienen asociado en el modelo
    //por cada perro asi queda en un solo objeto
    dbArray = dbArray.map(dog => {
        return {
          ...dog.dataValues,
          temperaments: dog.temperaments.map(temp => temp.name + ' ') //Temperaments{id: .. , name:... }
        }
      });

    //Filtro mi array ( teniendo en cuenta que temperaments es un [ ] de nombres )
    let newDbArray = dbArray.filter(dog => dog.temperaments?.join(coma).toLowerCase().includes(temp))
    
    let NEWnewDbArray = newDbArray.map(dog =>{
    return {
        id: dog.id,
        name: dog.name,
        bred_for: dog.bred_for,
        breed_group: dog.breed_group,
        origin: dog.origin,
        life_span:dog.life_span,
        minHeight:dog.minHeight,
        maxHeight:dog.maxHeight,
        minWeight:dog.minWeight,
        maxWeight:dog.maxWeight,
        image:dog.image.url,
        temperament:dog.temperaments,
    }
    })

    let index = page;
    let firstSlice = index * limit;
    let lastSlice = limit * (index + 1);
    NEWnewDbArray = NEWnewDbArray.slice(firstSlice, lastSlice)
            
        
    if(!Object.keys(NEWnewDbArray).length) throw Error ('Pagina Vacia')
    


    return NEWnewDbArray; 

        

    }

    //Si dogsFrom es API    ------------------------------------------------------------------------------------------
    if(dogsFrom === 'API'){
    while (i < 2) {
        let apiData = await axios(`https://api.thedogapi.com/v1/breeds?limit=100&page=${i}`)//?apy_key=${api_key}`);
        // [   [ {}{}{} ],[ {}{}{} ]    ]
        apiArray.push(apiData);
        i++;
    }
        
    if(!apiArray || apiArray.length === 0) throw Error ("Hay un Error en la Peticion a la API - DOGTEMPS");

    (await Promise.all(apiArray)).map(res=> 
        res.data.map(dog=>{
            tempArray.push(dog);
        })
    )
        
    apiArray = tempArray.map(dog =>{    
        //creo valores vacios para por si la API tiene valores incompletos
        let {minHeight,maxHeight,minWeight,maxWeight} = ''
        
        //Desarrollo las alturas medicion Metrica   
        minHeight = parseInt(dog.height.metric.slice(0,2).trim());
        maxHeight = parseInt(dog.height.metric.slice(4).trim());
        //Desarollo los pesos medicion Metrica
        minWeight = parseInt(dog.weight.metric.slice(0,2).trim());
        maxWeight = parseInt(dog.weight.metric.slice(4).trim());

        return {
            id: dog.id,
            name: dog.name,
            bred_for: dog.bred_for,
            breed_group: dog.breed_group,
            origin: dog.origin,
            life_span:dog.life_span,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            image:dog.image.url,
            temperament:dog.temperament?.split(','),
        }  
    })

    let newApiArray = apiArray.filter(dog => dog.temperament?.join(coma).toLowerCase().includes(temp))

    let index = page;
    let firstSlice = index * 8;
    let lastSlice = 8 * (index + 1);
    newApiArray = newApiArray.slice(firstSlice, lastSlice)
        
    if(!Object.keys(newApiArray).length) throw Error ('Pagina Vacia')

    return newApiArray; 
}
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = filteredDogs;