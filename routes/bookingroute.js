import express from 'express';

import {addbooking,getbookingbyuserid,getallbookings,getbookingbybookingid,updatebookingstatus} from '../controllers/bookingcontroller.js';

const router=express.Router();

router.post('/addbooking',addbooking);
router.get('/getbookingbyuserid/:userid',getbookingbyuserid);
router.get('/getbookingbybookingid/:bookingid',getbookingbybookingid);
router.get('/getallbookings',getallbookings);
router.put('/updatebookingstatus',updatebookingstatus);

router.post('/gettotalamount',async(req,res)=>{
   let {carid,startdate,enddate}=req.body;
   let sql="select per_day_price from cars where carid=?";
   console.log(carid);
   startdate=new Date(startdate);
   enddate=new Date(enddate);
   let [result]=await pool.execute(sql,[carid]);
   const perDayPrice = result[0]?.per_day_price ?? 0;
   const diffMs = enddate - startdate;
   const diffDays = diffMs / (24 * 60 * 60 * 1000);
   const days = Math.ceil(diffDays) + 1; 
   const totalAmount = perDayPrice * days;
   return res.status(200).json({ ...result[0], totalAmount });
});
export default router;