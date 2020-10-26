import { Router } from 'express';
import AuthMiddleWare from '../middleware/auth';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogs';
import BlogValidator from '../middleware/validators/blogValidation';


const router = Router();

router.post('/addBlog', 
[ 
    AuthMiddleWare,
    BlogValidator.createBlogDataValidate,
 ],
createBlog
);

router.get('/',getBlogs);

router.get('/:id',getBlogById);

router.patch('/updateBlog/:id',[AuthMiddleWare],updateBlog);

router.delete('/delete/:id', [AuthMiddleWare],deleteBlog);

export default router;
