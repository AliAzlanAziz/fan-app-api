import { model, Schema, Types } from "mongoose";

const favoriteSchema = new Schema({
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
  createdAt: { type: Date, default: Date.now },
});

const Favorite = model("Favorite", favoriteSchema);

export default Favorite;
