import express from "express";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface IRoute {
  path: string;
  method: Methods;
  handler: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void | Promise<void>;
  localMiddleware: ((
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void)[];
}

abstract class Controller {
  public router: express.Router = express.Router();
  public abstract path: string;
  protected abstract readonly routes: Array<IRoute> = [];

  public setRoutes = (): express.Router => {
    for (const route of this.routes) {
      for (const mw of route.localMiddleware) {
        this.router.use(route.path, mw);
      }
      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;
        case "POST":
          this.router.post(route.path, route.handler);
          break;
        case "PUT":
          this.router.put(route.path, route.handler);
          break;
        case "DELETE":
          this.router.delete(route.path, route.handler);
          break;
        default:
          console.log("not a valid method");
          break;
      }
    }

    return this.router;
  };

  protected sendSuccess(
    res: express.Response,
    data: object,
    message?: string
  ): express.Response {
    return res.status(200).json({
      message: message || "success",
      data: data,
    });
  }

  protected sendError(
    res: express.Response,
    message?: string
  ): express.Response {
    return res.status(500).json({
      message: message || "internal server error",
    });
  }
}

export default Controller;
