import { Schema, model } from 'mongoose';
const inquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default : new Date()
    },
    status: {
        type: String,
        default: 1
    }
})

const Inquiry = model('Inquiry',inquirySchema);
const _Inquiry = Inquiry;
export { _Inquiry as Inquiry };