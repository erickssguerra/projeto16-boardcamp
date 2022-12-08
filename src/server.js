import express, { json } from "express";
import connection from "./database/database.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(json());

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
