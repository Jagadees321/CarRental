import express from 'express';
import { addbooking, getbookingbyuserid, getallbookings, getbookingbybookingid, updatebookingstatus, gettotalamount, getbookingbycarid, checkcaravailability, getunavailabledates } from '../controllers/bookingcontroller.js';

const router = express.Router();

router.post('/addbooking', addbooking);
router.get('/getbookingbyuserid/:userid', getbookingbyuserid);
router.get('/getbookingbybookingid/:bookingid', getbookingbybookingid);
router.get('/getbookingbycarid/:carid', getbookingbycarid);
router.get('/getallbookings', getallbookings);
router.put('/updatebookingstatus', updatebookingstatus);
router.post('/gettotalamount', gettotalamount);
router.get('/checkavailability/:carid', checkcaravailability);
router.get('/unavailabledates/:carid', getunavailabledates);

export default router;