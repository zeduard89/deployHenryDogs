const { Dog , Temperaments} = require ('../db')


const postDogs = async (dogInfo) => {
    try {
        
        
        const {name,bred_for,breed_group,origin,life_span,minHeight,maxHeight,minWeight,maxWeight,image,temperamentId1,temperamentId2,temperamentId3,temperamentId4} = dogInfo;

        if(!name || !bred_for || !breed_group || !origin || !life_span || !minHeight || !maxHeight || !minWeight || !maxWeight || !image || !temperamentId1 || !temperamentId2 || !temperamentId3 || !temperamentId4) 
        throw Error ('Por favor ingrese todos los datos');

        //Controlo que no existe un perro con el mismo nombre en la DB
        const dogDB = await Dog.findOne({
            where: {
                name:name,
             }})
        if(dogDB) throw Error ('Ese nombre ya existe, por favor ingrese otro')
        
        //Lo ingreso a la DB
        const newDog = await Dog.create({
            name:name,
            bred_for:bred_for,
            breed_group:breed_group,
            origin:origin,
            life_span:life_span,
            minHeight:parseInt(minHeight),
            maxHeight:parseInt(maxHeight),
            minWeight:parseInt(minWeight),
            maxWeight:parseInt(maxWeight),
            image:image,
            
        });
       
        let temp = [temperamentId1,temperamentId2,temperamentId3,temperamentId4];

        //Genero 4 recorridos para que se realcionen Dog/Temp
        let j = 0;
        while(j<temp.length) { 
            newDog.addTemperaments(await Temperaments.findAll({
            where: {
              name:temp[j],
            },
          }))

          j++;
        }
        
        return `${name} creado Exitosamente, su ID es ${newDog.id} Guardelo con mucho Amor, tanto como lo heremos nosotros!`;

    } catch (error) {
    
        return error.message;
    }
}

module.exports = postDogs;