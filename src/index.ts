import express from "express";
import Server from "./typings/Server";

// middleware
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";

// Controllers
import Controller from "./typings/Controller";
import AuthController from "./controllers/AuthController";

const app: express.Application = express();
const server: Server = new Server(app, 3001);

const controllers: Array<Controller> = [new AuthController()];

const globalMiddleware: Array<express.RequestHandler> = [
  urlencoded({ extended: false }),
  cors({ credentials: true, origin: true }),
  morgan("dev"),
  json(),
];

Promise.resolve()
  // .then(() => server.database())
  .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers);
    server.run();
  });
