const mongoose = require('mongoose');

//Direccion de la conexion
const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI : 'mongodb://localhost/wikidrive';

//Metodo para conectarse a instancia mongodb

mongoose.connect(URI,{
    //Parametros para la conexion
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

//Propiedad que escucha la conexion

const connection = mongoose.connection;

//Metodo para verificar cuando la conexion con la base de datos se ha estblecido
connection.once('open',()=>{
    console.log("MongoDB is Connected");
});