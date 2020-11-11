import Blog  from '../models/blogs';import { verify } from 'jsonwebtoken';

export const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find();
        
        if(blogs.length === 0){
            return res.send('No blogs in the database').status(400) 
        }
        else {
            return res.send({
                status: 200,
                message: 'Get request',
                blogs
            }).status(200)     
        }
    }
    catch (error) {
        res.send(error).status(500);
    }
}

export const getBlogById = async (req, res) => {
    try {
        const _id = req.params.id;
        
        const blog = await Blog.findById(_id);
        res.json(blog).status(200);
    } catch (error) {
        res.json(error).status();
    }
    
}

export const createBlog = async (req, res) => {
    try {
        
        const {_id, name} = req.user;
        const { title, author, content } = req.body;
        const blog = await Blog.findOne({ title });
        
        if (blog) return res.json('Blog exist').status(400);
        
        const newBlog = new Blog({
                title,
                author: {name, _id},
                content
        });
            
        const savedBlog = await newBlog.save();
        res.send({'Created successfully': savedBlog}).status(201);
    } catch (error) {
        return res.send(error).status(400);
    }
}

export const deleteBlog = async(req,res) => {
    let {id} = req.params;
    
    try {
        const existBlog = await Blog.find({_id: id})

        if (existBlog.length) {
            const deleteBlog = await Blog.deleteOne({_id: id});
            res.send({'Deleted Blog': existBlog}).status(200);
        } else {
            res.json('Blog not found').status(404);
        }
    } catch (error) {
        res.json(error).status(500);
    }
}

export const updateBlog = async(req,res) => {
    try{
        const id = req.params.id;
        const blog = await Blog.findByIdAndUpdate({_id: id}, req.body);
        const updateBlog = await Blog.findOne({_id: id});
        res.json(updateBlog).status(200);
    }
    catch(error){
        res.send({message: 'Blog not found'}).status(404)
    }
};