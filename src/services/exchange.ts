import { Response } from "express";
import {
  ExchangeStatus,
} from "../enum/exchangeStatus.enum";
import { ExchangeModel } from "../models/exchange.model";
import { UserModel } from "../models/user.model";
import {
  findAllExchanges,
  findExchangesByUser,
  findUserApprovedHearts,
  findUserHeartsSumGroupByStatus,
  findUserPendingHearts,
  updateExchangeStatusById,
} from "../repo/exchange";
import Exchange from "../schema/exchange";

export const createExchange = async (
  exchange: ExchangeModel,
  user: UserModel,
  res: Response
) => {
  try {
    const newExchange = new Exchange({
      user: user._id,
      hearts: exchange.hearts,
      amount: exchange.hearts * 900, // amount = (hearts * unitPrice) - (hearts * unitPrice * 0.1), since unitPrice = 1000
      // (simplifying we get)=> hearts * 900
      status: ExchangeStatus.PENDING,
    });

    await newExchange.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created Exchange request!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const allExchanges = async (res: Response) => {
  try {
    const exchanges = await findAllExchanges();

    return res.status(200).json({
      success: true,
      exchanges: exchanges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const userAllExchanges = async (user: UserModel, res: Response) => {
  try {
    const exchanges = await findExchangesByUser(user._id);

    return res.status(200).json({
      success: true,
      exchanges: exchanges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const updateExchangeStatusToApproved = async (
  exchangeId: string,
  res: Response
) => {
  try {
    await updateExchangeStatusById(exchangeId, ExchangeStatus.APPROVED);

    return res.status(200).json({
      success: true,
      message: "Successfully approved exchange request",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const updateExchangeStatusToRejected = async (
  exchangeId: string,
  res: Response
) => {
  try {
    await updateExchangeStatusById(exchangeId, ExchangeStatus.REJECTED);

    return res.status(200).json({
      success: true,
      message: "Successfully rejected exchange request",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const getUserPendingHearts = async (user: string) => {
  return await findUserPendingHearts(user);
}

export const getUserApprovedHearts = async (user: string) => {
  return await findUserApprovedHearts(user);
}

export const getUserHeartsSumGroupByStatus = async (user: string) => {
  return await findUserHeartsSumGroupByStatus(user);
}