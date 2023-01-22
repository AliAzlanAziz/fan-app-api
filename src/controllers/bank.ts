import { Request, Response, NextFunction } from "express";
import { parseBankUpdateDataFromRequestBody } from "../helpers/formDataParser";
import { allBanks, bankInformation, updateBankInformation, updateBankStatusToApproved, updateBankStatusToRejected } from "../services/bank";

export const checkReachable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Banks APIs reachable" });
};

export const getBankInformation = (req: Request, res: Response, next: NextFunction) => {
  return bankInformation(req.context.user, res);
};

export const putBankInformation = (req: Request, res: Response, next: NextFunction) => {
  return updateBankInformation(req.context.user, parseBankUpdateDataFromRequestBody(req), res);
};

export const getAllBanks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return allBanks(res);
};

export const postBankStatusToApproved = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return updateBankStatusToApproved(req.params.bankId, res);
};

export const postBankStatusToRejected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return updateBankStatusToRejected(req.params.bankId, res);
};
