require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
//Initializations
const app = express();
app.use(fileUpload());

//Settings
app.set("port", process.env.PORT || 8082);
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Middlewares
app.use(cors());

//Configuracion para permitir el uso de archivos json
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/wikiComercial/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Routes
//Ruta para manejo de usuarios
app.use("/api/users", require("./routes/users"));
//Ruta para manejo de grupos
app.use("/api/groups", require("./routes/groups"));
//Ruta para manejo del drive
app.use("/api/drive", require("./routes/drive"));

//conexion a base de datos
require("./database/database");

module.exports = app;
