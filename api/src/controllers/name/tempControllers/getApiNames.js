require('dotenv').config();
const {api_key} = process.env;
const axios = require('axios');
const { Name , Dog } = require ('../../../db');       



const getApiNames = async () => {
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
        
        if(!apiArray && !apiArray.isArray()) throw Error ("Hay un Error en la Peticion Name");

        (await Promise.all(apiArray)).map(res=> 
            res.data.map(data=>{
                //(!data.name)? tempArray.push('')
                //:tempArray.push(data.name.split(coma));
                tempArray.push({
                    name:data.name.toLowerCase().replace(/\s+/g, ''),
                    id:data.id
                });
            }) 
        )
        
        //filteredNames.forEach((name =>{
        tempArray.forEach((dog =>{
            Name.findOrCreate({
                where: { 
                name: dog.name,
                id:dog.id },
              })
        }));

        let auxArray = await Dog.findAll()
        auxArray.forEach(dog => {
            tempArray.push({name:dog.name,id:dog.id})
        })


        return tempArray;

    } catch (error) {

        return {error: error.message}
    }
}


module.exports = getApiNames;