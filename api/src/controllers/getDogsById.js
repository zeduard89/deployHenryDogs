require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const {Dog, Imagenes} = require ('../db')
const uuid = require('uuid');
    

const getDogsById = async (id) => {
    try {
        
        //Primero busco en la DB segun ID uuid
        if(uuid.validate(id)){
            let dogDB = await Dog.findOne({
                where: {id:id,
                }})  
            if(dogDB) return dogDB;
        }

        //Corroboro que sea un numero!  luego que este entre los permitidos
        if(isNaN(id))  throw Error (`El ID ${id} debe ser numerico`)
          
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds/${id}?${api_key}`);

        //Corroboro que no me retorne un objeto vacio
        if(!Object.keys(data).length) throw Error (`El ${id} no es valido`)



            //Desarrollo las alturas en Metrica
            let minHeight = parseInt(data.height.metric.slice(0,2).trim());
            let maxHeight = parseInt(data.height.metric.slice(4).trim());
            //Desarollo los pesos en Metrica
            let minWeight = parseInt(data.weight.metric.slice(0,2).trim());
            let maxWeight = parseInt(data.weight.metric.slice(4).trim());

            //Si data.ref viene vacio no entro a la DB
            let imagen= '';
            if(data.reference_image_id){
            imagen = await Imagenes?.findOne({
                where: {
                  id:data.reference_image_id
                }
              })}

            //Reviso respuesta la DB y la API
            let newImagen = imagen ? imagen.dataValues.image : data.image;
              
              
            //SI no exite le adhiero una imagen Provisoria
        
        //Manejo la info de data, genero OBJ  ---
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
                   image: newImagen,
                   temperament:data.temperament.split(','),
               }
        
        return dogDetail;

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = getDogsById;