import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    author:{
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;