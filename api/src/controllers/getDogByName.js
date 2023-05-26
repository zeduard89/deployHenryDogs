require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const { Name,Dog,Imagenes,Temperaments } = require ('../db');

    
const getDogByName = async (name) => {
    try {
    
    
    if(!name) throw Error ('Se requiere una Raza valida')
    if(!isNaN(name))  throw Error (`El valor de '${name}', debe ser un String`)
        
    //Primero busco en la DB segun name y le agrego los temperamentos asociados-----------------------------------
        let dogDB = await Dog.findOne({
            where: {
                name:name
            },
            include: [{
            model: Temperaments,
            attributes: ["name"],       //solos los names
            through: { attributes: []}, //omito las datos de la otra tabla
          }],
             }) 
     
    //Si existe         
    if(dogDB){
        //Proceso el array de Temps y se los agrego como atributo temperaments
        let newDogDB = {
            ...dogDB.dataValues,
            temperaments: dogDB.temperaments.map(temp => temp.name + ' ') //Temperaments{id: .. , name:... }
          }
          //Creo el objeto newDogDB en el formato que quiero y lo retorno
          newDogDB = {
              id: newDogDB.id,
              name: newDogDB.name,
              bred_for: newDogDB.bred_for,
              breed_group: newDogDB.breed_group,
              origin: newDogDB.origin,
              life_span:newDogDB.life_span,  
              image:newDogDB.image? newDogDB.image:null,
              temperament:newDogDB.temperaments,
            }
            
        return newDogDB
    }
    


    

    //Analizo el 'name recibido' segun mi DB modelo-Name si conicide (esta contiene la relacion ID-name de la api)
    //continuo el proceso con ese ID, para evitar errores de tipeo 
    let modRaza = name.toLowerCase().replace(/\s+/g, '') 
    let nameDB = await Name.findOne({
        where: {
            name: modRaza,
            }
        });

    if(!nameDB) throw Error (`El valor de '${name}' no se encuentra en los registros`)


    //Busco en la API-------------------------------------------------------
    const {data} = await axios(`https://api.thedogapi.com/v1/breeds/${nameDB.id}?apy_key=${api_key}`);
    //Corroboro que no me retorne un objeto vacio
    if(!Object.keys(nameDB).length) throw Error (`El Valor no es valido`)
    
    
    //Desarollo los altura en Metrica
    let minHeight = parseInt(data.height.metric.slice(0,2).trim());
    let maxHeight = parseInt(data.height.metric.slice(4).trim());
    //Desarollo los pesos en Metrica
    let minWeight = parseInt(data.weight.metric.slice(0,2).trim());
    let maxWeight = parseInt(data.weight.metric.slice(4).trim());
    
    const dogDetail = {
           id: data.id,
           name: data.name,
           bred_for: data.bred_for,
           breed_group: data.breed_group,
           origin: data.origin,
           life_span:data.life_span,
           minHeight,
           maxHeight,
           minWeight,
           maxWeight,
           temperament:data.temperament.split(','),
           image: data.reference_image_id
           ? await Imagenes.findOne({ where :{id: data.reference_image_id}}): null   
       }

if(dogDetail) return dogDetail;




    } catch (error) {
        return error.message
    }
}

module.exports = getDogByName;