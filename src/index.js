const app = require("./app");
const fs = require("fs");
const https = require("https");

// const privateKey = fs.readFileSync("src/server.key");
// const certificate = fs.readFileSync("src/server.crt");

// var sslOptions = {
//   key: privateKey,
//   cert: certificate,
// };

//conexion a base de datos;

async function main() {
  //await https.createServer(sslOptions,app).listen(app.get('port'));
  app.listen(app.get("port"));
  console.log("Server on port " + app.get("port"));
}

main();
