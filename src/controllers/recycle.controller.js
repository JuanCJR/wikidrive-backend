const recycleCtrl = {};
const fs = require("fs");
const path = require("path");
const homedir = path.join(require("../../homedir"), "userdata"); //path.join("userdata");
const recycleBin = path.join(require("../../homedir"), "recycle bin");
const rimraf = require("rimraf");
const authorizationModel = require("../models/authorizations");
const fse = require("fs-extra");

//Lista objetos de un directorio
recycleBin.getDir = async (req, res) => {
  const { route} = req.body;
  const auth = await authorizationModel.find();
  let objectsArray = fs.readdirSync(recycleBin + route);
  let dirArray = [];
  let fileArray = [];
  let compareArray = [];
  objectsArray.map((o) => {
    if (path.extname(o)) {
      fileArray.push({
        name: o,
        type: "file",
      });
    } else {
      dirArray.push({
        name: o,
        type: "dir",
      });
    }
  });
  dirArray.sort();
  fileArray.sort();
  compareArray = dirArray.concat(fileArray);
  let returnedData = [];
  compareArray.map(async (r) => {
    let validaObj = auth.filter((a) => a.objPath === route + "/" + r.name);
    //Valida si encuentra ruta
    if (validaObj.length) {
      if (validaObj.length) returnedData = returnedData.concat(validaObj[0]);
    }
  });

  res.json(returnedData);
};

module.exports = recycleCtrl;
