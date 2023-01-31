import { BankStatus } from "../enum/bankStatus.enum";
import { BankModel } from "../models/bank.model";
import Bank from "../schema/bank"

export const findBankByUserId = async (user: string) => {
    return await Bank.findOne({user: user})
                        .select({__v: 0});
}
export const findBankByUserIdAdmin = async (user: string) => {
    return await Bank.findOne({user: user})
                        .populate('user', '_id name imageUrl email artist')
                        .select({__v: 0});
}

export const updateBankById = async (id: string, bank: BankModel) => {
    return await Bank.findByIdAndUpdate(id, bank);
}

export const findAllBanks = async () => {
    return await Bank.find()
                        .populate('user', '_id name imageUrl artist').sort({createdAt: -1});
}

export const updateBankStatusById = async (id: string, status: BankStatus) => {
    return await Bank.findByIdAndUpdate(id, {status: status});
}