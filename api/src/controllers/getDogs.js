//const { Dogs } = require ('../models/Dogs');
require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const {Dog, Temperaments} = require('../db')

const getDogs = async (page,order) => {
    
try {
    page= parseInt(page) 

    let count = 0;
    let apiArray = [];
    let tempArray = [];
        
    while (count < 2) {
            let apiData = await axios(`https://api.thedogapi.com/v1/breeds?limit=100&page=${count}`)//?apy_key=${api_key}`);
         // [   [ {}{}{} ],[ {}{}{} ]    ]
            apiArray.push(apiData);
            count++;
        }
        
        if(!apiArray && !apiArray.isArray()) throw Error ("Hay un Error en la Peticion");

        //Resuelvo Promesas y las Agrego a tempArray
        (await Promise.all(apiArray)).map(res=> 
            res.data.map(dog=>{
                 
                    //Desarrollo las alturas medicion Metrica
                    let minHeight = parseInt(dog.height.metric.slice(0,2).trim());
                    let maxHeight = parseInt(dog.height.metric.slice(4).trim());
                    //Desarollo los pesos medicion Metrica
                    let minWeight = parseInt(dog.weight.metric.slice(0,2).trim());
                    let maxWeight = parseInt(dog.weight.metric.slice(4).trim());
                    
                    let newDog = {
                        id: dog.id,
                        name: dog.name,
                        bred_for: dog.bred_for,
                        breed_group: dog.breed_group,
                        origin: dog.origin,
                        life_span:dog.life_span,
                        minHeight,
                        maxHeight,
                        minWeight,
                        maxWeight:maxWeight?maxWeight:minWeight,    
                        image:dog.image.url,
                        temperament:dog.temperament?.split(','),
                        }
                    return tempArray.push(newDog);
                
            }) 
        )
    //Array API listo

    //Busco los Dogs de la DB y luego los PUSHEO

    let dbDogDB = await Dog.findAll({
        include: [{
          model: Temperaments,
          attributes: ["name"],       //solos los names
          through: { attributes: []}, //omito las datos de la otra tabla
        }],
      });
  
      //Copio los datos de DATAVALUES y le agrego los temperamentos q lo tienen asociado en el modelo
      //por cada perro asi queda en un solo objeto
      let dbArray = dbDogDB.map(dog => {
          return {
            ...dog.dataValues,
            temperaments: dog.temperaments.map(temp => temp.name + ' ') //Temperaments{id: .. , name:... }
          }
        });
  
      
      let NEWnewDbArray = dbArray.map(dog =>{
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

      tempArray.push(NEWnewDbArray);
    
    //Flat() devuelve 1 solo Array (Array Con subArrays)
    //new SET() Set  permite almacenar valores únicos/referencias,no repetidos de cualquier tipo
    
    let filteredDogs = [...new Set(tempArray.flat())];

    if(order === 'ASCENDENTE'){
        filteredDogs.sort((a,b) => b.maxWeight - a.maxWeight )
    }
    if(order === 'DESCENDENTE'){
        filteredDogs.sort((a,b) => a.maxWeight - b.maxWeight )
    }

    //El método localeCompare() retorna un número indicando si una cadena de carateres de referencia va 
    //antes, después o si es la misma que la cadena dada en orden alfabético.
    if(order == 'ABC'){
        filteredDogs.sort((a,b)=> a.name.localeCompare(b.name)) 
    }
     if(order === 'CBA'){
         filteredDogs.sort((a,b) => b.name.localeCompare(a.name) )
     }

    //Limito a 8 Dogs x pagina
    let index = page;           //1
    let firstSlice = index * 8; //8
    let lastSlice = 8 * (index + 1); // 8*2 = 16

    filteredDogs = filteredDogs.slice(firstSlice, lastSlice)
        
       
     if(!Object.keys(filteredDogs).length) throw Error ('Pagina Vacia')


    return filteredDogs;
        

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = getDogs;