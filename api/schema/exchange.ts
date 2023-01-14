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
  amount: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
  status: {
    type: String,
    required: true,
    enum: ["pending", "complete", "rejected"],
  }, //default pending jaega, to dekh lena k required aega ya nhe yahan
  created_at: { type: Date, default: Date.now },
});

const Exchange = model("Exchange", exchangeSchema);

export default Exchange;
