import { model, Schema, Types } from "mongoose";

const donationSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  poster: {
    type: Types.ObjectId,
    ref: "Poster",
    required: true,
  },
  package: {
    type: Types.ObjectId,
    ref: "Package",
    required: true,
  },
  hearts: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
  total: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
  status: {
    type: String,
    required: true,
    enum: ["complete", "incomplete"],
  }, //ye random switch kar dena kbi complete kbi incomplete
  created_at: { type: Date, default: Date.now },
});

const Donation = model("Donation", donationSchema);

export default Donation;
