import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    min: 1,
    max: 512,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: { type: String },
  total_views: {
    type: Number,
    default: 0,
  },
  total_favorites: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
