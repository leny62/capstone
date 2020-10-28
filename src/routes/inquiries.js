import { Router } from 'express';
import { sendInquiry, getInquiries, getInquiryByStatus, getInquiryById, updateStatus } from '../controllers/inquiries';
import isAdmin from '../middleware/admin';

const router = Router();

router.post('/sendInquiry', sendInquiry);
router.get('/allInquiries',[isAdmin], getInquiries);
router.get('/byStatus/:status', [isAdmin],getInquiryByStatus);
router.get('/byInquiryId/:id', [isAdmin],getInquiryById);
router.put('/updateStatus/inquiry/:id/status/:status', [isAdmin],updateStatus)


export default router;