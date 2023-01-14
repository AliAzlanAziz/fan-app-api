const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    id: { type: Number, autoIncrement: true, primaryKey: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hearts: { type: Number, required: true },
    amount: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
    status: {
        type: String,
        required: true,
        enum: ["pending", "complete", "rejected"]
    }, //default pending jaega, to dekh lena k required aega ya nhe yahan
    created_at: { type: Date, default: Date.now }
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
