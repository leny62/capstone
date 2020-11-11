import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema({
    author:{
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    inquiry: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
})

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;