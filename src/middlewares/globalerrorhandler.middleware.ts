import { Request, Response } from "express";
import { errorResponder } from "../utils/errors/error.responder";

export const globalErrorhandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  console.log("global error");
  errorResponder({ error, res });
};
