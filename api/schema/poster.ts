import { model, Schema, Types } from "mongoose";

const posterSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [{ type: String }],
  title: { type: String, required: true },
  date: { type: Date },
  location: { type: String },
  description: { type: String },
  fan_notes: { type: String },
  total_views: { type: Number, default: 0 },
  total_donations: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Poster = model("Poster", posterSchema);

export default Poster;
