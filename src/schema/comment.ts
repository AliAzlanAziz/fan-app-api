const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: { type: Number, autoIncrement: true, primaryKey: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poster',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
