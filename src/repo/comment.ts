import Comment from "../schema/comment";

export const findCommentsByPoster = async (poster: string) => {
    return await Comment.find({poster: poster})
                        .populate('user', '_id name artist imageUrl')
                        .select('_id user text');
}