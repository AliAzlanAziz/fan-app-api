import { model, Schema, Types } from "mongoose";

const packageSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    hearts: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Package = model('Package', packageSchema);

export default Package;
