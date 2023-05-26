require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const { Temperaments } = require ('../../../db');       


const getApiTemperaments = async () => {
    try {
        const coma = ',';
        let i = 0
        let apiArray = [];
        let tempArray = [];
        
        while (i < 2) {
            let apiData = await axios(`https://api.thedogapi.com/v1/breeds?limit=100&page=${i}`)//?apy_key=${api_key}`);
         // [   [ {}{}{} ],[ {}{}{} ]    ]
            apiArray.push(apiData);
            i++;
        }
        
        
        if(!apiArray && !apiArray.isArray()) throw Error ("Hay un Error en la Peticion Temperaments");

        (await Promise.all(apiArray)).map(res=> 
            res.data.map(data=>{
                (!data.temperament)? tempArray.push('')
                :tempArray.push(data.temperament.split(coma));
            }) 
        )
        //Flat() devuelve 1 solo Array (Array Con subArrays)
        //SET() Set  permite almacenar valores únicos/no repetidos de cualquier tipo
        const filteredTemperaments = [...new Set(tempArray.flat())];
        
        filteredTemperaments.forEach((temperament =>{
            if(temperament) {
            Temperaments.findOrCreate({
                where: { name: temperament.trim() },
              })}
        }));

        return filteredTemperaments;

    } catch (error) {

        return {error: error.message}
    }
}


module.exports = getApiTemperaments;