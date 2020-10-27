import { Blog } from '../models/blogs';
import { date, time } from '../utils/date';
import { UniqueId } from '../utils/uniqueId';
import _ from 'lodash';
import getCurrentDate from '../utils/date';
import currentUser from '../utils/auth.currentUser';
import { User } from '../models/users';
import Response from '../utils/response';

const response = new Response();


export const createBlog=async(req,res)=>{
try {

     let newBlog = new Blog();

     newBlog.author = req.userInfo._id;
     newBlog.title = req.body.title;
     newBlog.date = getCurrentDate();
     newBlog.content = req.body.content;
     
     const blog = await newBlog.save();
     const data ={
        blogId:blog._id,
        title:blog.title,
        content:blog.content,
        author:blog.author,
        date:blog.date,
     }

     response.setSuccess(201,'Created successfully',data);

     return response.send(res);

} catch (error) {
    response.setError(500,'Intenal server error');
    return response.send(res);
}
   
}

export const getBlogs = async(req,res)=>{
    const blogs = await Blog.find();
    
    if(blogs.length === 0){
       return res.send('No blogs in the database').status(400) 
    }
    return res.send({
        success: true,
        status: 200,
        blogs: blogs
    }).status(200)     

}

export const getBlogById = async(req,res) => {
    await Blog.findOne({_id: req.params.id}).then(async (blog)=>{
        await User.findOne({_id: blog.author}).then(author => {
            res.send({
                success: true,
                status: 200,
                blog: {
                    _id: blog._id,
                    authorId: author._id,
                    authorName: author.name,
                    title: blog.title,
                    date: blog.date,
                    content: blog.content
                }
            }).status(200)
        })
    })
    
}

export const updateBlog = async(req,res) => {
    let query = {_id: req.params.id};
    let blog;
    try{
        blog = await Blog.findOne({_id: req.params.id});
    }
    catch(error){
     return  res.send({
            success: false,
            status: 404, 
            message: 'Blog not found'
        }).status(404)
    }
   
    
   let user = await currentUser(req,res);
    if(user.role != 'ADMIN' && user._id !== blog.author){
        return res.send({
            success: false,
            status: 400,
            message: 'You are not allowed to update this blog'
        }).status(400);
    }

    let newData = {
        author: user._id,
        date: blog.date,
        title: req.body.title,
        content: req.body.content,

    }

    Blog.findByIdAndUpdate(query,newData).then((updatedBlog)=>{
        res.send({
            success: true,
            status: 200,
            message:'Blog updated',
            blog:{
                _id: updatedBlog._id,
                authorId: user._id,
                authorName: user.name,
                date: blog.date,
                title: newBlog.title,
                content: newBlog.content
                
            }
        }).status(200)

    }).catch(err =>{
        res.send(err).status(400);
    })
}

export const deleteBlog = async(req,res) => {
    let query = {_id: req.params.id};
    let blog;
  
        blog = await Blog.findOne({_id: req.params.id});
  
    if(!blog) return  res.send({
            success: false,
            status: 404, 
            message: 'Blog not found'
        }).status(404)
  
    
   let user = await currentUser(req,res);
    if(user.role != 'ADMIN' && user._id !== blog.author){
        return res.send({
            success: false,
            status: 400,
            message: 'You are not allowed to delete this blog'
        }).status(400);
    }

  Blog.findOneAndDelete(query).then(removedBlog =>{
        res.send({
            success: true,
            status: 200,
            message: 'Blog removed',
            removedBlog: {
                _id: blog._id,
                authorId: user._id,
                authorName: user.name,
                date: blog.date,
                title: blog.title,
                content: blog.content
            }
        }).status(200)
    }).catch(error => {
        res.send(error);
    })
}
