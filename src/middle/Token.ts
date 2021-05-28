import jwt from "jsonwebtoken";
import express from "express";
import { UserModel } from "../typings/index";
import { ACCESS_TOKEN_SECRET } from "../config";

export default class Token {
  public static verify(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const header = req.headers.authorization;
    if (!header) {
      res.json({
        data: {
          tokenVerificationData: {
            access: false,
            message: "No token provided.",
          },
        },
      });
      return;
    }
    const token = header.split(" ")[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
      if (err) {
        console.log({ err });
        res.json({
          data: {
            tokenVerificationData: {
              access: false,
              message: "Failed to verify token.",
            },
          },
        });
        return;
      } else {
        const decoded = <{ user: object }>decodedFromToken;
        const decodedUser = <UserModel>decoded.user;
        req.verifiedUser = decodedUser;
        next();
      }
    });
  }
}
