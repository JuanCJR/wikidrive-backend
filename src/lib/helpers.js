const helpers = {};
const bcrypt = require('bcryptjs');

//Metodo para encryptar contraseñas
helpers.encryptPassword = async (passwd) => {

    //Genera hash y se indica el numero de repeticiones
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwd, salt);

    return hash;
}//.

helpers.matchPassword = async (passwd, savedPasswd) => {

    try {
        return await bcrypt.compare(passwd, savedPasswd);

    }catch(e){
        console.log(e);
    }

}//.



module.exports = helpers;