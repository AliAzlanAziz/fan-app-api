import { NextFunction, Request, Response } from "express";
import { JWTTokenPayloadModel } from "../models/jwtTokenPayload.model";
import { ContextModel } from "../models/context.model";
import jwt from "jsonwebtoken";
import { findUserById } from "../repo/user";

export const addContextIfExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | null = getToken(req);
  if (token) {
    const payload: JWTTokenPayloadModel = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JWTTokenPayloadModel;

    if (payload.id) {
      const result = await findUserById(payload.id);
      if (result) {
        req.context = getContext(result);
      }
    }
  }

  return next();
};

const getToken = (req: Request): string | null => {
  const token = req.headers.authorization?.split(" ");
  if (token && token[0] === "Bearer") {
    return token[1];
  }
  return null;
};

const getContext = (user: any): ContextModel => {
  return new ContextModel(user);
};
