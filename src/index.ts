import express from "express";
import Server from "./typings/Server";
import SocketServer from "./typings/SocketServer";

// middleware
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";

// Controllers
import Controller from "./typings/Controller";
import AuthController from "./controllers/AuthController";
import AdminController from "./controllers/AdminController";
import ServicesController from "./controllers/ServicesController";
import RequestsController from "./controllers/RequestsController";
import { PORT } from "./config";

const app: express.Application = express();
const server: Server = new Server(app, PORT);

const controllers: Array<Controller> = [
  new AuthController(),
  new AdminController(),
  new ServicesController(),
  new RequestsController(),
];

const globalMiddleware: Array<express.RequestHandler> = [
  urlencoded({ extended: false }),
  cors({ credentials: true, origin: true }),
  morgan("dev"),
  json(),
];

Promise.resolve().then(() => {
  server.loadMiddleware(globalMiddleware);
  server.loadControllers(controllers);
  const httpServer = server.run();
  const socketServer = new SocketServer(httpServer);
  socketServer.run();
});
