import express from 'express';
import { addcar, getallcars, getcarsbyowner, getcarbyid, updatecar, deleteCar } from '../controllers/carscontrollers.js';

const route = express.Router();

route.post('/', addcar);
route.get('/', getallcars);
route.get('/owner/:userid', getcarsbyowner);
route.get('/:id', getcarbyid);
route.put('/:id', updatecar);
route.delete('/:id', deleteCar);

export default route;