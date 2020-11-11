import Comment  from '../models/comments';

export const getComments = async (req, res)=>{
    try {
        const comments = await Comment.find();
        
        if(comments.length === 0){
            return res.send('No comments in the database').status(400) 
        }
        else {
            return res.send({
                status: 200,
                message: 'Get request',
                comments
            }).status(200)     
        }
    }
    catch (error) {
        res.send(error).status(500);
    }
}

export const getCommentById = async (req, res) => {
    try {
        const _id = req.params.id;
        
        const comment = await Comment.findById(_id);
        res.json(comment).status(200);
    } catch (error) {
        res.json(error).status();
    }
    
}

export const createComment = async (req, res) => {
    try {
        
        const {_id, name} = req.user;
        const { author, comment } = req.body;
        
        const newComment = new Comment({
                author: {name, _id},
                comment
        });
            
        const savedComment = await newComment.save();
        res.send({'Created successfully': savedComment}).status(201);
    } catch (error) {
        return res.send(error).status(400);
    }
}

export const deleteComment = async(req,res) => {
    let {id} = req.params;
    
    try {
        const existComment = await Comment.find({_id: id})

        if (existComment.length) {
            const deleteComment = await Comment.deleteOne({_id: id});
            res.send({'Deleted Comment': existComment}).status(200);
        } else {
            res.json('Comment not found').status(404);
        }
    } catch (error) {
        res.json(error).status(500);
    }
}