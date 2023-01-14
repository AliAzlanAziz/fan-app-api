import { model, Schema, Types } from "mongoose";

const packageSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    name: { type: String, required: true },
    hearts: { type: Number, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

const Package = model('Package', packageSchema);

export default Package;
