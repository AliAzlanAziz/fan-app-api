import { model, Schema, Types } from "mongoose";

const exchangeSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  hearts: { type: Number, required: true },
  amount: { type: Number, required: true }, 
  status: {
    type: String,
    required: true,
    enum: [1, 2, 3], //["pending", "complete", "rejected"],
  }, 
  createdAt: { type: Date, default: Date.now },
});

const Exchange = model("Exchange", exchangeSchema);

export default Exchange;
