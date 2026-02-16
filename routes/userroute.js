import express from "express";
import {getallusers,getuserbyid,updateuser,deleteuser} from '../controllers/usercontroller.js'
const route=express.Router();

route.get('/',getallusers);
route.get('/:id',getuserbyid);//10
route.put('/:id',updateuser);
route.delete('/:id',deleteuser);

export default route;