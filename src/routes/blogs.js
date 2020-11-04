import { Router } from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogs';
import { loggedUser } from '../middleware/admin';


const router = Router();

router.post('/addBlog', loggedUser, createBlog );

router.get('/', getBlogs);

router.get('/:id',getBlogById);

router.put('/updateBlog/:id', loggedUser, updateBlog);

router.delete('/delete/:id', loggedUser, deleteBlog);

export default router;
