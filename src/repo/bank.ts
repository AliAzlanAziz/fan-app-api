import { BankStatus } from "../enum/bankStatus.enum";
import { BankModel } from "../models/bank.model";
import Bank from "../schema/bank"

export const findBankByUserId = async (user: string) => {
    return await Bank.findOne({user: user});
}

export const updateBankById = async (id: string, bank: BankModel) => {
    return await Bank.findByIdAndUpdate(id, bank);
}

export const findAllBanks = async () => {
    return await Bank.find()
                        .populate('user', '_id name imageUrl');
}

export const updateBankStatusById = async (id: string, status: BankStatus) => {
    return await Bank.findByIdAndUpdate(id, {status: status});
}