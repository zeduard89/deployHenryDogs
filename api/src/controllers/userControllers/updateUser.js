const { Users } = require ('../../db');  

const updateUser = async (name,email,password) => {
    
    try {
        
        if(!name && !email && !password) throw Error ('Datos ingresados Incorrectamente');

        const updateUser = await Users.findOne({
            where:{
                email: email
            } 
        })

        if(!updateUser) throw Error('Error Al modificar los Datos, revise el Email ingresado');
        
        await updateUser.update({
            name,
            password
        })
        await updateUser.save();
        
    
        
        return updateUser;

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = updateUser;