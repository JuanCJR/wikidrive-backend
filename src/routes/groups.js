const express = require("express");
const router = express.Router();
const { createGroup, getGroups } = require("../controllers/group.controller");

//Ruta para creacion de grupo
router.route("/create").post(createGroup);
//Ruta para listar grupos
router.route("/getgroups").get(getGroups);
//ruta para modificar grupo
router.route("/update").post();
//Ruta para eliminar grupo
router.route("/delete").post();

module.exports = router;
