import ENV from "../constants/env.constant";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtTokenType } from "../constants";
import User from "../models/User.model";
import respond from "../utils/respond";

export const verifyAuthToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    // check if it exists
    if (!token) return respond(res, 401, "Pls Authenticate");

    // check if it's valid
    const decoded: any = jwt.verify(token, ENV.ACCESS_TOKEN_SEC);
    if (!decoded) return respond(res, 401, "Pls Authenticate");

    // if (decoded?.type !== JwtTokenType.auth)
    //   return respond(res, 401, "Pls provide a valid token...");

    // check if user exists
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.accessToken": token,
    });
    if (!user) return respond(res, 404, "Sorry but user is not found!");

    // verificaton
    if (!user.isAccountVerified)
      return respond(res, 403, "pls verify your account");

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    // if something went wrong
    respond(res, 401, "Pls Authenticate");
  }
};

export const verifyAuthStateByTokenQuery = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token)
      return respond(res, 403, "Your token is either invalid or expired");

    let decoded: any = jwt.verify(token, ENV.REFRESH_TOKEN_SEC);
    if (!decoded)
      return respond(res, 403, "Your token is either invalid or expired");

    const user = await User.findOne({ _id: decoded._id });
    if (!user) return respond(res, 404, "Sorry but this user is not found!");

    req.user = user;
    req.decodedToken = decoded;

    next();
  } catch (e: any) {
    respond(res, 403, "Your token is either invalid or expired");
  }
};
