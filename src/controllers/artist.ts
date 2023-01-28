import { Request, Response, NextFunction } from "express";
import { artistProfileDetails, updateArtistProfile } from "../services/artist";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Artists APIs reachable" });
};

export const putArtistProfile = (req: Request, res: Response, next: NextFunction) => {
  return updateArtistProfile(req.context.user, req, res);
};

export const getArtistProfileDetails = (req: Request, res: Response, next: NextFunction) => {
  return artistProfileDetails(req?.context?.user, req.params.artistId, res);
};