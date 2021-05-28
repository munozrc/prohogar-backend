import express from "express";
import Token from "../Middlewares/Token";
import RequestService from "../services/RequestService";
import Controller, { Methods } from "../typings/Controller";

class ServicesController extends Controller {
  path = "/api";
  routes = [
    {
      path: "/services",
      method: Methods.GET,
      handler: this.handleGetServices,
      localMiddleware: [Token.verify],
    },
    {
      path: "/services",
      method: Methods.POST,
      handler: this.handleCreateService,
      localMiddleware: [Token.verify],
    },
  ];

  constructor() {
    super();
  }

  async handleGetServices(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { id } = req.verifiedUser;
      if (typeof id === "string") {
        const userService = new RequestService(id);
        const data = await userService.getServices();
        if (data.success) {
          super.sendSuccess(res, data.data!, data.message);
        } else {
          super.sendError(res, data.message);
        }
      } else {
        super.sendError(res, "Invalid ID Client.");
      }
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }

  async handleCreateService(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { id } = req.verifiedUser;
      const userService = new RequestService(
        id,
        req.body.title,
        req.body.category,
        req.body.location,
        req.body.description
      );
      const data = await userService.addSercice();
      if (data.success) {
        super.sendSuccess(res, data.data!, data.message);
      } else {
        super.sendError(res, data.message);
      }
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }
}

export default ServicesController;
