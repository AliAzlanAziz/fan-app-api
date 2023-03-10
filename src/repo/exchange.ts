import { ExchangeStatus } from "../enum/exchangeStatus.enum";
import Exchange from "../schema/exchange";

export const findAllExchanges = async () => {
  return await Exchange.find().populate('user', '_id name artist imageUrl email').sort({createdAt: -1});;
};

export const findExchangesByUser = async (user: string) => {
  return await Exchange.find({ user: user }).select({ user: 0 }).sort({createdAt: -1});
};

export const findExchangesById = async (id: string) => {
  return await Exchange.findById(id).populate('user', '_id name artist imageUrl email');
};

export const updateExchangeStatusById = async (
  id: string,
  status: ExchangeStatus
) => {
  return await Exchange.findByIdAndUpdate(id, { status: status });
};

export const findUserPendingHearts = async (user: string) => {
  return await Exchange.aggregate([
    { $match: { user: user, status: ExchangeStatus.PENDING } },
    {
      $group: {
        approvedHearts: {
          $sum: "$hearts",
        },
      },
    },
  ]);
};

export const findUserApprovedHearts = async (user: string) => {
  return await Exchange.aggregate([
    { $match: { user: user, status: ExchangeStatus.APPROVED } },
    {
      $group: {
        rejectedHearts: {
          $sum: "$hearts",
        },
      },
    },
  ]);
};

export const findUserHeartsSumGroupByStatus = async (user: string) => {
  return await Exchange.aggregate([
    { $match: { user: user } },
    {
      $group: {
        _id: "$status",
        total: {
          $sum: "$hearts",
        },
      },
    },
  ]);
};
