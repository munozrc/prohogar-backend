import express from "express";
import Token from "../middlewares/Token";
import Controller, { Methods } from "../typings/Controller";
import getUserById from "../utils/getUserById";

class UsersController extends Controller {
  path = "/api";
  routes = [
    {
      path: "/users/:id",
      method: Methods.GET,
      handler: this.handleGetUserById,
      localMiddleware: [Token.verify],
    },
  ];

  constructor() {
    super();
  }

  async handleGetUserById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (typeof id === "string") {
        const userFind = getUserById(id);
        if (userFind !== null) {
          super.sendSuccess(res, userFind, "SUCCESFUL_QUERY");
        } else {
          super.sendError(res, "NOT_FOUND_USER");
        }
      } else {
        super.sendError(res, "Invalid ID User.");
      }
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }
}

export default UsersController;
