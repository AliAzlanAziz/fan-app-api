const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posterSchema = new Schema({
    id: { type: Number, autoIncrement: true, primaryKey: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [
      { type: String }
    ],
    title: { type: String, required: true },
    date: { type: Date },
    location: { type: String },
    description: { type: String },
    fan_notes: { type: String },
    total_views: { type: Number, default: 0 },
    total_donations: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

const Poster = mongoose.model('Poster', posterSchema);

module.exports = Poster;
