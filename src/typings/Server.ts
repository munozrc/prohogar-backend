import express from "express";
import http from "http";
import Controller from "./Controller";

class Server {
  private app: express.Application;
  private readonly port: number;

  constructor(app: express.Application, port: number) {
    this.app = app;
    this.port = port;
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => {
      console.log("Server on port", this.port);
    });
  }

  public loadMiddleware(middlewares: Array<express.RequestHandler>): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }
}

export default Server;
