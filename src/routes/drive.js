const express = require("express");
const router = express.Router();
const {
  getDir,
  createDir,
  uploadFile,
  downloadFile,
  deleteSimpleDir,
  deleteRecursiveDir,
  changeName,
  deleteFile,
} = require("../controllers/drive.controller");

//Ruta para descargar archivo
router.route("/file/download").get(downloadFile);

//Ruta para eliminar archivo
router.route("/file/delete").post(deleteFile);

//Ruta para subir archivo nuevo
router.route("/file/upload").post(uploadFile);

//Ruta para cambiar el nombre de algun directorio o archivo
router.route("/changename").post(changeName);

//Ruta para devolver directorios del inicio
router.route("/getdir").post(getDir);

//Ruta para crear directorio
router.route("/dir/createdir").post(createDir);

//Ruta para eliminar un directorio vacio
router.route("/dir/simpledelete").post(deleteSimpleDir);

//Ruta para eliminar un directorio con contenido
router.route("/dir/recursivedelete").post(deleteRecursiveDir);

module.exports = router;
