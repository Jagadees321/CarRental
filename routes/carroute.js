import express from 'express';
import {addcar,getallcars,getcarbyid,updatecar} from '../controllers/carscontrollers.js'
const route=express.Router();

route.post('/',addcar);
route.get('/',getallcars);
route.get('/:id',getcarbyid);
route.put('/:id',updatecar);
// route.delete('/:id',deleteCar);

export default route;