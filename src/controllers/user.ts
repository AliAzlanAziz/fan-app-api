import { Request, Response, NextFunction } from "express";
import {
  Signin,
  Signup,
} from "../services/user";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "User APIs reachabled" });
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  return Signup(req.body.user, res);
};

export const postSignin = (req: Request, res: Response, next: NextFunction) => {
  return Signin(req.body.user, res);
};