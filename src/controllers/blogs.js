const {Blog}  = require('../models/blogs')
const {date,time } =  require('../utils/date');
let {UniqueId } = require('../utils/uniqueId');
const _ = require('lodash');
const getCurrentDate = require('../utils/date');
const currentUser = require('../utils/auth.currentUser');
const {User} = require('../models/users');


exports.createBlog = async(req,res)=>{
    let user = await currentUser(req,res);
    let newBlog = new Blog();

    newBlog.author = user._id;
    newBlog.title = req.body.title;
    newBlog.date = await getCurrentDate();
    newBlog.content = req.body.content;
    
    newBlog.save().then(async (blog)=>{
        await User.findOne({_id: user._id}).then(async (author)=>{
            res.send({
                success: true, 
                status: 200,
                message: 'Blog created',
                blog: {
                    _id: blog._id,
                    authorId: user._id,
                    authorName: author.name,
                    authorEmail: author.email,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date
                }
            }).status(200);
        })
    }).catch((error)=>{
        res.send(error).status(400)
    })
}

exports.getBlogs = async(req,res)=>{
    const blogs = [] = await Blog.find();
    let allBlogs = [];
    blogs.forEach(async(blog) => {
        await User.findOne({_id: blog.author}).then( user => {
            allBlogs.push({
             
                    _id: blog._id,
                    authorId: user._id,
                    authorName: user.name,
                    authorEmail: user.email,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date
             
            })
            if(allBlogs.length == blogs.length){
                return res.send({
                    success: true,
                    status: 200,
                    blogs: allBlogs
                }).status(200)
            }
          })
    })
}

exports.getBlogById = async(req,res)=>{
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
            }).status(00)
        })
    })
    
}

exports.updateBlog = async(req,res)=>{
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

exports.deleteBlog = async(req,res)=>{
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
