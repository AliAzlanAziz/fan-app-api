import { model, Schema, Types } from "mongoose";

const bankSchema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  idNumber: { 
    type: String, 
    required: true 
  },
  bankAccount: { 
    type: String, 
    required: true 
  },
  accountOwnerName: { 
    type: String, 
    required: true 
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  status: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
    default: 1
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Bank = model("Bank", bankSchema);

export default Bank;
