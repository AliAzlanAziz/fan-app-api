import { NextFunction, Request, Response } from "express";
import { artistDonationHistory, createDonation, fanDonationHistory } from "../services/donation";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Donations APIs reachable" });
};

export const postDonation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return createDonation(req.body.donation, req.context.user, res);
};

export const getFanDonationHistory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return fanDonationHistory(req.context.user, res);
};

export const getArtistDonationHistory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return artistDonationHistory(req.context.user, res);
};
