import { NextFunction, Request, Response } from "express";
import { JWTTokenPayloadModel } from "../models/jwtTokenPayload.model";
import { ContextModel } from "../models/context.model";
import jwt from "jsonwebtoken";
import { findUserById } from "../repo/user";
import { UserRoles } from "../enum/userRole.enum";

export const isUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | null = getToken(req);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access!",
      });
    }

    const payload: JWTTokenPayloadModel = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JWTTokenPayloadModel;

    const result = await findUserById(payload.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User does not exist!",
      });
    } else if (result.role == UserRoles.USER) {
      return res.status(404).json({
        success: false,
        message: "Invalid user role!",
      });
    }

    req.context = getContext(result);
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
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
