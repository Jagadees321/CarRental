import userservice from "../services/userservice.js";

export const getallusers=async(req,res)=>{
    try{
       let result=await userservice.getallusers();
       res.status(200).json(result);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

export const getuserbyid=async(req,res)=>{
    try {
        let id=req.params.id;//10
        let result=await userservice.getuserbyid(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
export const updateuser=async(req,res)=>{
    try {
       let id=req.params.id;
       let user=req.body;
       let result=await userservice.updateuser(id,user);
       res.status(200).json(result); 
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const deleteuser=async(req,res)=>{
    try {
        let id=req.params.id;
        let result=await userservice.deleteuser(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

 
