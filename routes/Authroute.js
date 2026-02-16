import express from 'express';
import {registerUser,login} from '../controllers/Authcontroller.js'
const route=express.Router();

route.post('/register',registerUser);
route.post('/login',login)

export default route;
