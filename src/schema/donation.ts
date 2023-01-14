const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationSchema = new Schema({
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
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    hearts: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
    total: { type: Number, required: true }, //ye post nhe hoga, backend pe calculate hoga. To dekh lena k required aega ya nhe
    status: {
        type: String,
        required: true,
        enum: ["complete", "incomplete"]
    }, //ye random switch kar dena kbi complete kbi incomplete
    created_at: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
