const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  reconectUser,
  getUsers,
} = require("../controllers/user.controller");

//ruta para obtener usuarios
router.route("/getusers").get(getUsers);

//ruta para creacion de usuario
router.route("/signup").post(signup);

//ruta para inicio de sesion
router.route("/signin").post(signin);

//ruta para reconectar usuario
router.route("/reconect").post(reconectUser);

module.exports = router;
