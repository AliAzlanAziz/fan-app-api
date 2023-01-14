import { model, Schema, Types } from "mongoose";

const registerInfoSchema = new Schema({
    id: { type: Number, autoIncrement: true, primaryKey: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    id_number: { type: String, required: true },
    bank_account: { type: String, required: true },
    account_owner_name: { type: String, required: true },
    image_url: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"]
    }, //default pending jaega, to dekh lena k required aega ya nhe yahan
    created_at: { type: Date, default: Date.now }
});

const RegisterInfo = model('RegisterInfo', registerInfoSchema);

module.exports = RegisterInfo;
