import { NextFunction, Request, Response } from "express";
import { AllPackages } from "../services/package";

export const getAllPackages = (req: Request, res: Response, next: NextFunction) => {
    return AllPackages(res);
}  