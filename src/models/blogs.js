import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;