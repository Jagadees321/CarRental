import pool from "../dbconfig/db.js";
import bcrypt from 'bcryptjs';

const registerUser = async(user)=>{
    try{
        let {username,email,password,phonenumber}=user;
        console.log("service",user);
        
        password=await bcrypt.hash(password,10);
       let sql="insert into users(username,email,password,phonenumber) values(?,?,?,?)";
       const [result]=await pool.execute(sql,[username,email,password,phonenumber]);
       return result;
    }catch(error){
       return error;
    }
}

const login=async(email,password)=>{
    try {
        let sql="select email,password from users where email=?";
        let [result]=await pool.execute(sql,[email]);
        if(result.length>0){
            let ispasswordmatching=await bcrypt.compare(password,result[0].password);
            if(ispasswordmatching){
                return {status:200,message:"login successful"};
            }else{
                return {status:400,message:"invalid password"};
            }
        }else{
            console.log("testing");
            return {status:404,message:"user not found"};
        }
    } catch (error) {
        console.log('hello');
        return {status:500,message:"internal server error"};
    }
}
export default {registerUser,login};