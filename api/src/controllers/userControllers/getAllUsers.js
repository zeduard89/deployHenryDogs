const {Users} = require('../../db')

const getAllUsers = async (name,email,password) => {
    
    try {

        //Chequeo si el usuario existe, en tal caso retorno access TRUE.
        let access = false;
        const allUsers = await Users.findAll();

        allUsers.forEach(user => {
            if(user.email === email && user.password === password && user.name === name)access = true;
        })

        return access;

    } catch (error) {
        return {error: error.message}
    }
}

module.exports = getAllUsers;