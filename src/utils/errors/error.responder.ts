import { Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Error } from "mongoose";
import multer, { MulterError } from "multer";
import ENV from "../../constants/env.constant";
import { CustomError } from "..";
import { logger } from "../logger/logger.util";
import respond from "../respond";

type ER = {
  error: Error | any;
  res: Response;
};

export const errorResponder = ({ error, res }: ER) => {
  if (ENV.NODE_ENV !== "production") console.error({ error });
  //   console.error({ error });
  const e = error as CustomError;
  if (e?.message) logger.error(e.message);

  if (error instanceof CustomError) {
    return respond(res, error.statusCode, error.message, error.errors);
  }

  if (error instanceof Error.CastError) return respond(res, 400, error.message);

  //   if (error instanceof AxiosError)
  //     return respond(res, error.status || 500, error.message);

  if (error instanceof Error) return respond(res, 500, error.message);

  if (error instanceof TypeError) return respond(res, 400, error.message);

  if (error instanceof TokenExpiredError)
    return respond(res, 401, error.message);

  if (error instanceof JsonWebTokenError)
    return respond(res, 401, error.message);
  if (error instanceof MulterError) return respond(res, 500, error.message);

  //   if (error instanceof Joi.ValidationError)
  // return respond(res, 400, error.message);

  if (error instanceof multer.MulterError) {
    console.log(error);
    if (error.code === "LIMIT_FILE_SIZE")
      return respond(res, 400, "File size exceeded it's limit");

    return respond(res, 400, "Error occurred while uploading files");
  }

  logger.error(error);
  return respond(res, 500, "unexpected error");
};
