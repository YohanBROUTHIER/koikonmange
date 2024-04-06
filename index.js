import http from "node:http";
import https from "node:https";
import fs from "node:fs";

import "./src/helpers/envLoad.js";

import app from "./src/index.js"; //Module express

if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync(process.env.SSL_PATH + "privkey.pem"),
    cert: fs.readFileSync(process.env.SSL_PATH + "fullchain.pem")
  };
  
  const httpsServer = https.createServer(options, app);
  
  const PORT = process.env.PORT || 3000;
  httpsServer.listen(PORT, () => {
    console.log(`Server listening on https://localhost:${PORT}`);
  });
} else {
  const httpServer = http.createServer(app);

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}



