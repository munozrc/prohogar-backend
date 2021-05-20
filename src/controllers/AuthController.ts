import express from "express";
import Controller, { Methods } from "../typings/Controller";
import UserService from "../services/UserService";

class AuthController extends Controller {
  path = "/api";
  routes = [
    {
      path: "/login",
      method: Methods.POST,
      handler: this.handleLogin,
      localMiddleware: [],
    },
    {
      path: "/register",
      method: Methods.POST,
      handler: this.handleRegister,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async handleLogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const userService = new UserService(email, password);
      const data = await userService.login();
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

  async handleRegister(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const userService = new UserService(
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.photo,
        req.body.role,
        req.body.category
      );
      const data = await userService.register();
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

export default AuthController;
