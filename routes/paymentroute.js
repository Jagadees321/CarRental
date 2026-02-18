import express from 'express';
import {
    createPayment,
    dummyPayment,
    getPaymentByPaymentId,
    getPaymentByBookingId,
    getPaymentsByUserId,
    getAllPayments,
    updatePaymentStatus,
} from '../controllers/paymentcontroller.js';

const router = express.Router();

router.post('/create', createPayment);
router.post('/dummy', dummyPayment);
router.get('/bypaymentid/:paymentid', getPaymentByPaymentId);
router.get('/bybookingid/:bookingid', getPaymentByBookingId);
router.get('/byuserid/:userid', getPaymentsByUserId);
router.get('/getall', getAllPayments);
router.put('/updatestatus', updatePaymentStatus);

export default router;
