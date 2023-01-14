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
  comment: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentSchema);

export default Comment;
