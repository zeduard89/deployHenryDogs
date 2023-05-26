require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const { Dog , Imagenes } = require ('../db')

      

    
        
const getByRaza = async (breed_group) => {
    try {
    
    let allDogsByRaza = [];
    
    if(!breed_group) throw Error ('Se requiere un tipo de Raza valida')
    if(!isNaN(breed_group))  throw Error (`El valor de '${breed_group}', debe ser un String`)
    
    //Primero busco en la DB segun raza
    const dogDB = await Dog.findAll({
        where: {
            breed_group:breed_group,
            }})  

    //Si existe Pusheo la informacion obtenida
    if(dogDB) dogDB.forEach((dog)=>
            allDogsByRaza.push(dog)
        );
    
    //Contino buscando en la api
    const coma = ',';
        let i = 0
        let apiArray = [];
        let tempArray = [];
        const apiDogs=[];
        
        while (i < 2) {
            let apiData = await axios(`https://api.thedogapi.com/v1/breeds?limit=100&page=${i}`)//?apy_key=${api_key}`);
         // [   [ {}{}{} ],[ {}{}{} ]    ]
            apiArray.push(apiData);
            i++;
        }
        
        
        if(!apiArray && !apiArray.isArray()) throw Error ("Hay un Error en la Peticion Temperaments");

        (await Promise.all(apiArray)).map(res=> 
            res.data.map(data=>{
                if(data.breed_group === breed_group) tempArray.push(data)
            }) 
        )
       
    tempArray =  await Promise.all(tempArray.map(async dog =>{
                
            
        //Desarollo los altura en Metrica
        let minHeight = parseInt(dog.height.metric.slice(0,2).trim());
        let maxHeight = parseInt(dog.height.metric.slice(4).trim());
        //Desarollo los pesos en Metrica
        let minWeight = parseInt(dog.weight.metric.slice(0,2).trim());
        let maxWeight = parseInt(dog.weight.metric.slice(4).trim());

           return {
            id: dog.id,
            name: dog.name,
            bred_for: dog.bred_for,
            breed_group: dog.breed_group,
            origin: dog.origin,
            life_span:dog.life_span,
            minHeight:minHeight,
            maxHeight:maxHeight,
            minWeight:minWeight,
            maxWeight:maxWeight,
            temperament:dog.temperament?.split(','),
            image: dog.reference_image_id
            ? await Imagenes.findOne({ where :{id: dog.reference_image_id}}): null   
        };
    }))
  

let  auxArray = [...tempArray , ...allDogsByRaza]
    return auxArray ;

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = getByRaza;