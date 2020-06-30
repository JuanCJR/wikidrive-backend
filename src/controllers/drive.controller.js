const driveCtrl = {};
const fs = require("fs");
const path = require("path");
const homedir = path.join("userdata");
const rimraf = require("rimraf");
const authorizationModel = require("../models/authorizations");
//Descarga archivo
driveCtrl.downloadFile = async (req, res) => {
  const filename = req.query.filename;
  const route = req.query.route;
  // let fb = fs.createReadStream(path.join(homedir, route + "/" + filename));
  // let ext = path.extname(filename);
  // console.log(ext.substr(1));
  // res.setHeader(
  //   "Content-Type",
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" +
  //     ext.substr(1)
  // );
  res.download(path.join(homedir, route + "/" + filename));
  //fb.pipe(res);
};

//Sube un nuevo archivo
driveCtrl.uploadFile = async (req, res) => {
  const { authorizations, route, type, users, groups } = req.body;
  const file = req.files.newFile;
  const uploadPath = homedir + route + "/" + file.name;
  await file.mv(uploadPath, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    const newAuth = new authorizationModel({
      objName: file.name,
      objPath: route + "/" + file.name,
      objType: "file",
      authorizations: {
        type: type,
        users: JSON.parse(users),
        groups: JSON.parse(groups),
      },
    });
    await newAuth.save();

    res.send("File uploaded to " + uploadPath);
  });
};

//Elimina directorio vacio
driveCtrl.deleteSimpleDir = async (req, res) => {
  const { route, dirName } = req.body;
  try {
    fs.rmdirSync(path.join(homedir, route + "/" + dirName));
    await authorizationModel.deleteOne({ objPath: route + "/" + dirName });
    res.json({ message: "Carpeta eliminada.", code: "dir-delete-true" });
  } catch (err) {
    res.json({ message: "No se ha eliminado.", code: err.code });
  }
};

//Elimina archivo
driveCtrl.deleteFile = async (req, res) => {
  const { route, dirName } = req.body;
  try {
    fs.unlinkSync(path.join(homedir, route + "/" + dirName));
    await authorizationModel.deleteOne({ objPath: route + "/" + dirName });
    res.json({ message: "Carpeta eliminada.", code: "file-delete-true" });
  } catch (err) {
    res.json({ message: "No se ha eliminado.", code: err.code });
  }
};

//Elimina un directorio con archivos
driveCtrl.deleteRecursiveDir = async (req, res) => {
  const { route, dirName } = req.body;
  rimraf.sync(path.join(homedir, route + "/" + dirName));

  res.json({ message: "Carpeta eliminada.", code: "dir-delete-true" });
};

//Modifica directorio y/o archivo
driveCtrl.changeName = async (req, res) => {
  const { route, newName, oldName } = req.body;
  fs.renameSync(
    path.join(homedir, route + "/" + oldName),
    path.join(homedir, route + "/" + newName)
  );
  await authorizationModel.updateOne(
    { objPath: route + "/" + oldName },
    {
      $set: {
        objName: newName,
        objPath: route + "/" + newName,
      },
    }
  );
  res.json({ message: "Modificación .", code: "obj-update-true" });
};

//Crea directorio
driveCtrl.createDir = async (req, res) => {
  const { objInfo } = req.body;
  try {
    fs.mkdirSync(homedir + objInfo.route + "/" + objInfo.dirName);
    const newAuth = new authorizationModel({
      objName: objInfo.dirName,
      objPath: objInfo.route + "/" + objInfo.dirName,
      objType: "dir",
      authorizations: objInfo.authorizations,
    });
    await newAuth.save();

    res.json({ message: "Directorio creado", code: "dir-true" });
  } catch (error) {
    res.json({ message: "Error", code: error.code });
  }
};

//Lista objetos de un directorio
driveCtrl.getDir = async (req, res) => {
  const { route, userName, userType } = req.body;
  if (userType === "admin") {
    let objectsArray = fs.readdirSync(homedir + route);
    let dirArray = [];
    let fileArray = [];
    let returnedData = [];
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
    returnedData = dirArray.concat(fileArray);
    res.json(returnedData);
  } else {
    const auth = await authorizationModel.find({
      $or: [
        {
          $and: [
            {
              "authorizations.type": "private",
            },
            {
              "authorizations.users": { $elemMatch: { userName: userName } },
            },
          ],
        },
        {
          $and: [
            {
              "authorizations.type": "public",
            },
          ],
        },
      ],
    });
    let objectsArray = fs.readdirSync(homedir + route);
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
    compareArray.map((r) => {
      if (auth.filter((a) => a.objPath === route + "/" + r.name).length)
        returnedData = returnedData.concat(r);
    });
    res.json(returnedData);
  }
};

module.exports = driveCtrl;
