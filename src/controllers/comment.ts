import { Request, Response, NextFunction } from "express";
import { createComment } from "../services/comment";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Comments APIs reachable" });
};

export const postComment = (req: Request, res: Response, next: NextFunction) => {
    return createComment(req.body.comment, req.context.user, res);
};