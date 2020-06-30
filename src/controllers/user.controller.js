const userCtrl = {};
const usersModel = require("../models/users.js");
const helpers = require("../lib/helpers");

//Funcion para listar usuarios
userCtrl.getUsers = async (req, res) => {
  const users = await usersModel.find();
  res.json(users);
};

//Funcion para reconectar
userCtrl.reconectUser = async (req, res) => {
  const { _id } = req.body;
  const user = await usersModel.findById({ _id: _id });
  res.json(user);
};

//Funcion para inicio de sesion
userCtrl.signin = async (req, res) => {
  const { userInfo } = req.body;
  const user = await usersModel.find({ userName: userInfo.userName });
  //Valida que el usuario exista
  if (user.length) {
    //Funcion para comparar contraseñas, en caso de ser correcta devuelve true
    const verifyPasswd = await helpers.matchPassword(
      userInfo.passwd,
      user[0].passwd
    );
    if (verifyPasswd) {
      res.json(user[0]);
    } else {
      res.json({
        message: "La contraseña no es correcta",
        code: "passwd-false",
      });
    }
  } else {
    res.json({ message: "El usuario no existe", code: "user-false" });
  }
};
//Funcion para crear usuario
userCtrl.signup = async (req, res) => {
  const { userInfo } = req.body;
  const passwdEncrypt = await helpers.encryptPassword(userInfo.passwd);

  const newUser = new usersModel({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    userName: userInfo.userName,
    passwd: passwdEncrypt,
    type: userInfo.type,
  });

  const user = await newUser.save();
  res.json(user);
};

module.exports = userCtrl;
