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
  artist: {
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
  quantity: { type: Number, required: true },
  totalHearts: { type: Number, required: true }, // package.hearts x quantity
  totalPrice: { type: Number, required: true }, // package.price x quantity
  packageCopy: {
    hearts: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  status: {
    type: Number,
    required: true,
    enum: [1, 2], // complete, incomplete
  },
  createdAt: { type: Date, default: Date.now },
});

const Donation = model("Donation", donationSchema);

export default Donation;
