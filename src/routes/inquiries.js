const express = require('express');
const router = express.Router();
const {sendInquiry, getInquiries, getInquiryByStatus, getInquiryById, updateStatus} = 
require('../src/controllers/inquiries');
const isAdmin = require('../src/middleware/admin');

router.post('/sendInquiry', sendInquiry);
router.get('/allInquiries',[isAdmin], getInquiries);
router.get('/byStatus/:status', [isAdmin],getInquiryByStatus);
router.get('/byInquiryId/:id', [isAdmin],getInquiryById);
router.put('/updateStatus/inquiry/:id/status/:status', [isAdmin],updateStatus)


module.exports = router;