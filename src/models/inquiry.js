const mongoose = require('mongoose');
const inquirySchema = new mongoose.Schema({
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
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1
    }
})

const Inquiry = mongoose.model('Inquiry',inquirySchema);
module.exports.Inquiry = Inquiry;