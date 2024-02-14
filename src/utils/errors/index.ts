import { NextFunction, Request, Response } from "express";
import { errorResponder } from "./error.responder";
import { IUser } from "../../models/User.model";

export interface IRequest {
  user: IUser;
  token?: string;
  file?: any;
  decodedToken?: string;
}

type Func = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | NextFunction | void>;

export const catchAsync =
  (fun: Func) => (req: any, res: Response, next: NextFunction) => {
    fun(req, res, next).catch((error: Error) => {
      errorResponder({ error, res });
      // next(error);
    });
  };

type SFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | NextFunction | void;
export const catchSync =
  (fun: SFunc) => (req: Request, res: Response, next: NextFunction) => {
    try {
      return fun(req, res, next);
    } catch (error) {
      errorResponder({ error, res });
    }
  };

type Fun = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response | NextFunction | void;
export const catchError =
  (func: Fun) => (req: Request, res: Response, next: NextFunction) =>
    func(req, res, next);
