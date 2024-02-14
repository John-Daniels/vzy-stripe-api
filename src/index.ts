import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import "./db";

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.clear();
  console.log(
    "\x1b[32m%s\x1b[0m",
    `VZY Test API's API is Connected on port ${port}`
  );
});
