const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    id: { type: Number, autoIncrement: true, primaryKey: true },
    name: { type: String, required: true },
    hearts: { type: Number, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
