const { Users } = require ('../../db');  

const postUser = async (name,email,password) => {
    
    try {
        if(!name && !email && !password) throw Error ('Datos ingresados Incorrectamente');

        const findedUser = await Users.findOne({
            where:{
                email: email
            } 
        })

        if(findedUser) throw Error (`Email: ${email}, ya se encuentra registrado!`)
        
        const newUser = await Users.create({
            
            name: name,
            email: email,
            password: password  
        })
    
        if(!newUser) throw Error ('El usuario no se pudo creo')
        

        return `Email: ${email} ,fue correctamente registrado!`;

    } catch (error) {
        return error.message;
    }
}

module.exports = postUser;