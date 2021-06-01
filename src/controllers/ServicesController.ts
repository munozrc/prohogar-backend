import express from "express";
import Token from "../middlewares/Token";
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
    {
      path: "/categories",
      method: Methods.GET,
      handler: this.handleGetCategories,
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
        const requestService = new RequestService(id);
        const data = await requestService.getServicesByClient();
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
      const requestService = new RequestService(
        id,
        req.body.title,
        req.body.category,
        req.body.location,
        req.body.description
      );
      const data = await requestService.addServiceByClient();
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

  async handleGetCategories(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const data = await RequestService.getAvailableCategories();
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
