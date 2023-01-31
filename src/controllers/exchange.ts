import { NextFunction, Request, Response } from "express";
import { adminExchangeDetail, allExchanges, createExchange, updateExchangeStatusToApproved, updateExchangeStatusToRejected, userAllExchanges } from "../services/exchange";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Exchanges APIs reachable" });
};

export const postCreateExchange = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return createExchange(req.body, req.context.user, res);
};

export const getAllExchanges = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return allExchanges(res);
};

export const getExchangeInfoAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return adminExchangeDetail(req.params.exchangeId, res);
};

export const getUserAllExchanges = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return userAllExchanges(req.context.user, res);
};

export const putExchangeStatusToApproved = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return updateExchangeStatusToApproved(req.params.exchangeId, res);
};

export const putExchangeStatusToRejected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return updateExchangeStatusToRejected(req.params.exchangeId, res);
};
