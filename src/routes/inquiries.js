import { Router } from 'express';
import { createInquiry, getInquiries, getInquiryById, deleteInquiry } from '../controllers/inquiries';
import { loggedUser } from '../middleware/admin';

const router = Router();

router.post('/addInquiry', loggedUser, createInquiry );

router.get('/', getInquiries);

router.get('/:id',getInquiryById);

router.delete('/delete/:id', loggedUser, deleteInquiry);

export default router;
