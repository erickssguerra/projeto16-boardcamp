import express, { json } from "express";
import router from "./routes/router.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(json());
server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
