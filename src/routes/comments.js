import { Router } from 'express';
import { createComment, getComments, getCommentById, updateComment, deleteComment } from '../controllers/comments';
import { loggedUser } from '../middleware/admin';


const router = Router();

router.post('/addComment', loggedUser, createComment );

router.get('/', getComments);

router.get('/:id',getCommentById);

router.delete('/delete/:id', loggedUser, deleteComment);

export default router;
