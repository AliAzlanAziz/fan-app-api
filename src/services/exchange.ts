import { Response } from "express";
import { Types } from "mongoose";
import {
  ExchangeStatus,
} from "../enum/exchangeStatus.enum";
import { ExchangeModel } from "../models/exchange.model";
import { HeartsModel } from "../models/hearts.model";
import { MongooseGroup } from "../models/mongooseGroup.model";
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
import { getArtistTotalHearts } from "./donation";

export const createExchange = async (
  exchange: ExchangeModel,
  user: UserModel,
  res: Response
) => {
  try {
    if(exchange.hearts < 1){
      return res.status(200).json({
        success: false,
        message: 'Cannot create exchange request. Minimum hearts to exchange is 1',
      })
    }
    const [totalHearts, hearts] = await Promise.all([
      getArtistTotalHearts(user._id),
      getUserHeartsSumGroupByStatus(user._id),
    ]);
    const total = (totalHearts[0] as MongooseGroup)?.total || 0;
    const remaining = total - hearts.pending - hearts.approved;
    if(remaining < exchange.hearts){
      return res.status(200).json({
        success: false,
        message: 'Cannot create exchange request, Insufficient hearts',
        remaining: remaining
      })
    }

    var baseAmount = exchange.hearts * 240
    var tax1 = baseAmount * 0.03
    tax1 = Math.floor(tax1 / 10) * 10
    var tax2 = tax1 / 10
    tax2 = Math.floor(tax2 / 10) * 10
    var amount = baseAmount - tax1 - tax2

    const newExchange = new Exchange({
      _id: new Types.ObjectId(),
      user: user._id,
      hearts: exchange.hearts,
      amount: amount, // amount = (hearts * unitPrice) - (hearts * unitPrice * 0.1), since unitPrice = 1000
      // (simplifying we get)=> hearts * 900
      status: ExchangeStatus.PENDING,
    });

    await newExchange.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created Exchange request!",
      remaining: remaining - exchange.hearts,
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

export const getUserHeartsSumGroupByStatus = async (user: string): Promise<HeartsModel> => {
  try{
    const exchangeGroupByStatus =  await findUserHeartsSumGroupByStatus(user);

    const hearts: HeartsModel = new HeartsModel(0, 0, 0);

    for(const item of exchangeGroupByStatus){
      if((item as MongooseGroup)._id == '1'){
        hearts.pending = (item as MongooseGroup).total;
      }else if((item as MongooseGroup)._id == '2'){
        hearts.approved = (item as MongooseGroup).total;
      }else{
        hearts.rejected = (item as MongooseGroup).total;
      }
    }

    return hearts;
  } catch(error) {
    throw error;
  }
}