import { Request, Response, NextFunction } from "express";
import { addArtistToUserFavorites, allUserFavorites, removeArtistFromUserFavorites } from "../services/favorite";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Favorite APIs reachable" });
};

export const postAddArtistToUsersFavorite = (req: Request, res: Response, next: NextFunction) => {
  return addArtistToUserFavorites(req.body.user._id, req.context.user, res);
};

export const deleteArtistFromUsersFavorite = (req: Request, res: Response, next: NextFunction) => {
  return removeArtistFromUserFavorites(req.body.user._id, req.context.user, res);
}

export const getAllUserFavorites = (req: Request, res: Response, next: NextFunction) => {
  return allUserFavorites(req.context.user, res);
}