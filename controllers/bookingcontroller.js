import bookingservice from '../services/bookingservice.js';

export const addbooking=async(req,res)=>{
    try {
        let booking=req.body;
        let result=await bookingservice.addbooking(booking);
        return res.status(201).json({message:"booking added successfully",result});
    } catch (error) {
        return res.status(500).json({message:"error adding booking",error});
    }
}

export const getallbookings=async(req,res)=>{
    try {
        let result=await bookingservice.getallbookings();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
export const getbookingbyuserid=async(req,res)=>{
    try {
        let userid=req.params.userid;
        let result=await bookingservice.getbookingbyuserid(userid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export const getbookingbybookingid=async(req,res)=>{
    try {
        let bookingid=req.params.bookingid;
        let result=await bookingservice.getbookingbybookingid(bookingid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export const updatebookingstatus=async(req,res)=>{
    try {
        let {bookingid,status}=req.body;            
        let result=await bookingservice.updatebookingstatus(bookingid,status);
        return res.status(200).json({message:"booking status updated successfully",result});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
}
