import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
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
  text: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentSchema);

export default Comment;
