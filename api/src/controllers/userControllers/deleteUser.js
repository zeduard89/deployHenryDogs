const {Users} = require('../../db')

const deleteUser = async (name,email,password) => {
    
    try {
        
        if(!name && !email && !password) throw Error ('Datos ingresados Incorrectamente');

        //Busco en mi DB, si existe.
        const findedUser = await Users.findOne({
            where:{
                name:name,
                email:email,
                password:password
            } 
        })
        

        if(!findedUser) throw Error (`Email: ${email}, no se encuentra registrado!`)
        
        //Si exise lo borro de la DB
        await findedUser.destroy();
        

        return `EL usuario fue Borrado con Exito`

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = deleteUser;