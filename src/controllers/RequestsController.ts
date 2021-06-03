import express from "express";
import Token from "../middlewares/Token";
import RequestService from "../services/RequestService";
import Controller, { Methods } from "../typings/Controller";

class RequestsController extends Controller {
  path = "/api";
  routes = [
    {
      path: "/requests",
      method: Methods.GET,
      handler: this.handleGetRequest,
      localMiddleware: [Token.verify],
    },
    {
      path: "/requests",
      method: Methods.PUT,
      handler: this.handleAnswerRequest,
      localMiddleware: [Token.verify],
    },
  ];

  constructor() {
    super();
  }

  async handleGetRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { id } = req.verifiedUser;
      if (typeof id === "string") {
        const requestService = new RequestService(id);
        const data = await requestService.getRequestsByPro();
        if (data.success) {
          super.sendSuccess(res, data.data!, data.message);
        } else {
          super.sendError(res, data.message);
        }
      } else {
        super.sendError(res, "Invalid ID Professional.");
      }
    } catch (error) {
      console.error(error);
      super.sendError(res);
    }
  }

  async handleAnswerRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const { id } = req.verifiedUser;
      const { service, value } = req.body;
      const data = await RequestService.answerRequest(service, id, value);
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

export default RequestsController;
