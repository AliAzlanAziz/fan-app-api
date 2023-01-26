import { Response } from "express";
import { Types } from "mongoose";
import { CommentModel } from "../models/comment.model";
import { UserModel } from "../models/user.model";
import { findCommentsByPoster } from "../repo/comment";
import Comment from "../schema/comment";

export const createComment = async (comment: CommentModel, user: UserModel, res: Response) => {
    try{
        const newComment = new Comment({
            _id: new Types.ObjectId(),
            user: user._id,
            poster: comment.poster,
            text: comment.text
        });

        await newComment.save();

        //await Comment.deleteMany({});
        return res.status(200).json({
            success: true,
            message: "Successfully commented on poster!"
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

export const getCommentsByPoster = async (poster: string) => { 
    return findCommentsByPoster(poster);
}