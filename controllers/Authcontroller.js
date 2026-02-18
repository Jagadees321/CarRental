import Authservice from '../services/authservice.js';

export const registerUser=async(req,res)=>{
    try {
        const user=req.body;
        console.log("controller fn",user);
        const result=await Authservice.registerUser(user);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
       
        
        const result=await Authservice.login(email,password);

        res.status(result.status).json(result.user ? { message: result.message, user: result.user } : { message: result.message });
    } catch (error) {
        res.status(500).json(error);
    }   
}

