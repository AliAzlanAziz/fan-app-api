import { Request, Response, NextFunction } from "express";
import { searchByArtistNameOrPosterTitle, top5ArtistsAndPosters } from "../services/common";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Common APIs reachable" });
};

export const getTop5ArtistsAndPosters = (req: Request, res: Response, next: NextFunction) => {
  return top5ArtistsAndPosters(res);
};

export const getArtistByNameOrPosterByTitle = (req: Request, res: Response, next: NextFunction) => {
  return searchByArtistNameOrPosterTitle(req.query.nameOrTitle as string, res);
};