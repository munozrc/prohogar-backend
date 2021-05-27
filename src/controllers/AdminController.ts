import express from "express";
import Controller, { Methods } from "../typings/Controller";
import AdminService from "../services/AdminService";

class AdminController extends Controller {
  path = "/api/admin";
  routes = [
    {
      path: "/users",
      method: Methods.GET,
      handler: this.handleGetUsers,
      localMiddleware: [AdminService.verify],
    },
    {
      path: "/services",
      method: Methods.GET,
      handler: this.handleGetServices,
      localMiddleware: [AdminService.verify],
    },
  ];

  constructor() {
    super();
  }

  async handleGetUsers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const data = AdminService.getUsers();
      super.sendSuccess(res, data);
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }

  async handleGetServices(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { filterState } = req.body;
      const data = AdminService.getServices(filterState);
      if (data.length === 0)
        super.sendSuccess(res, { services: "No services yet." });
      super.sendSuccess(res, data);
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }
}

export default AdminController;
