import { Request, Response, NextFunction } from "express";
import { parseUserUpdateDataFromRequestBody } from "../helpers/formDataParser";
import {
  signIn,
  signUp,
  userProfile,
  updateUserProfile,
  adminSignUp,
  adminSignIn,
} from "../services/user";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "User APIs reachable" });
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  return signUp(req.body, res);
};

export const postSignin = (req: Request, res: Response, next: NextFunction) => {
  return signIn(req.body, res);
};

export const postAdminSignup = (req: Request, res: Response, next: NextFunction) => {
  return adminSignUp(req.body, res);
};

export const postAdminSignin = (req: Request, res: Response, next: NextFunction) => {
  return adminSignIn(req.body, res);
};

export const getUserProfile = (req: Request, res: Response, next: NextFunction) => {
  return userProfile(req.context.user, res);
};

export const putUserProfie = (req: Request, res: Response, next: NextFunction) => {
  return updateUserProfile(req.context.user, parseUserUpdateDataFromRequestBody(req), res);
};