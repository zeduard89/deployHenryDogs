const { Temperaments } = require ('../../../db');       


const getAllDBTemps = async () => {
    try {
        
        const temperaments = await Temperaments.findAll();
        if(!temperaments.length) throw Error ('La BD esta vacia')

        return temperaments;

    } catch (error) {

        return {error: error.message}
    }
}


module.exports = getAllDBTemps;