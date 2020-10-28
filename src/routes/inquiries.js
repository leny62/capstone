import { Router } from 'express';
import { sendInquiry, getInquiries, getInquiryByStatus, getInquiryById, updateStatus } from '../controllers/inquiries';
import isAdmin from '../middleware/admin';

const router = Router();

router.post('/sendInquiry', sendInquiry);

router.get('/',
            [isAdmin], 
            getInquiries
);

router.get('/:id', 
                [isAdmin],
                getInquiryById
);

router.get('/byStatus/:status', [isAdmin],getInquiryByStatus);

router.put('/updateStatus/inquiry/:id/status/:status', [isAdmin],updateStatus)


export default router;