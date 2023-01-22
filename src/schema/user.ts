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
  artist: {
    name: {
      type: String,
      // unique: true, //will make sure by running logic on server and not this way as it will cause errors on two nulls being same
      min: 1,
      max: 512,
    },
    description: {
      type: String,
    }
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
  role: {
    type: Number,
    required: true,
    enum: [1, 2]
  },
  imageUrl: { 
    type: String 
  },
  totalViews: {
    type: Number,
    default: 0,
  },
  totalFavorites: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
