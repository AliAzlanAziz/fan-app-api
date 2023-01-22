import { Request, Response, NextFunction } from "express";
import { parsePosterDataFromRequestBody } from "../helpers/formDataParser";
import { createPoster, posterDetails, removePoster, updatePoster, userAllPosters } from "../services/poster";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Posters APIs reachable" });
};

export const getLoggedInUserAllPosters = (req: Request, res: Response, next: NextFunction) => {
  return userAllPosters(req.context.user._id, res);
};

export const getUserAllPostersByParamsUserId = (req: Request, res: Response, next: NextFunction) => {
  return userAllPosters(req.params.userId, res);
};

export const getPosterDetails = (req: Request, res: Response, next: NextFunction) => {
  return posterDetails(req.params.posterId, res);
};

export const postPoster = (req: Request, res: Response, next: NextFunction) => {
  return createPoster(req.context.user, parsePosterDataFromRequestBody(req), res);
};

export const putPoster = (req: Request, res: Response, next: NextFunction) => {
  return updatePoster(parsePosterDataFromRequestBody(req), res);
};

export const deletePoster = (req: Request, res: Response, next: NextFunction) => {
  return removePoster(req.params.posterId, res);
};