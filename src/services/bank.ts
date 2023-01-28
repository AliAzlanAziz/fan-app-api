import { Response } from "express";
import { Types } from "mongoose";
import { BankStatus } from "../enum/bankStatus.enum";
import { BankModel } from "../models/bank.model";
import { UserModel } from "../models/user.model";
import { findAllBanks, findBankByUserId, updateBankById, updateBankStatusById } from "../repo/bank";
import Bank from "../schema/bank";

export const bankInformation = async (user: UserModel, res: Response) => {
  try {
    const bank = await findBankByUserId(user._id);

    return res.status(200).json({
      success: true,
      bank: bank,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBankInformation = async (
  user: UserModel,
  bank: BankModel,
  res: Response
) => {
  try {
    const bankExist = await findBankByUserId(user._id);

    if (bankExist) {
      await updateBankById(bankExist._id as string, bank);
    } else {
      const newBank = new Bank({
        _id: new Types.ObjectId(),
        fullName: bank.fullName,
        idNumber: bank.idNumber,
        bankAccount: bank.bankAccount,
        accountOwnerName: bank.accountOwnerName,
        fileUrl: bank.fileUrl,
        status: BankStatus.PENDING,
        user: user._id,
      });

      await newBank.save();
    }

    const updatedBank = await findBankByUserId(user._id);

    return res.status(200).json({
      success: true,
      bank: updatedBank,
      message: "Successfully updated bank information!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allBanks = async (res: Response) => {
  try {
    const banks = await findAllBanks();

    return res.status(200).json({
      success: true,
      banks: banks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const updateBankStatusToApproved = async (
  bankId: string,
  res: Response
) => {
  try {
    await updateBankStatusById(bankId, BankStatus.APPROVED);

    return res.status(200).json({
      success: true,
      message: "Successfully approved bank information",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const updateBankStatusToRejected = async (
  bankId: string,
  res: Response
) => {
  try {
    await updateBankStatusById(bankId, BankStatus.REJECTED);

    return res.status(200).json({
      success: true,
      message: "Successfully rejected bank information",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
