import { Request } from "express";
import { BankModel } from "../models/bank.model";
import { PosterModel } from "../models/poster.model";
import { UserUpdateModel } from "../models/userUpdate.model";

export const parseUserUpdateDataFromRequestBody = (req: Request): UserUpdateModel => {
    // form data only sends text or file so we have to convert string "true" to boolean
    if(req.body.isUpdatingPassword == true || req.body.isUpdatingPassword == "true" || req.body.isUpdatingPassword == "1"){
        req.body.isUpdatingPassword = true
    }else{
        req.body.isUpdatingPassword = false;
    }

    return new UserUpdateModel(req.body.name, req.body.isUpdatingPassword, req.body.password, req.file?.filename);
}

export const parseBankUpdateDataFromRequestBody = (req: Request): BankModel => {
    return new BankModel(req.body.fullName, req.body.idNumber, req.body.bankAccount, req.body.accountOwnerName, req.file?.filename);
}