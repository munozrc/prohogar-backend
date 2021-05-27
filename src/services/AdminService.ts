import express from "express";
import { ACCESS_ADMIN } from "../config";
import { users } from "../models/Users";
import { professionals } from "../models/Professionals";

class AdminService {
  public static verify(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const tokenAdmin = req.headers["x-access-admin"];
    if (!tokenAdmin && tokenAdmin !== ACCESS_ADMIN) {
      res.json({
        access: false,
        message: "No token provided",
      });
      return;
    }
    next();
  }

  public static getUsers() {
    return { users, professionals };
  }
}

export default AdminService;
