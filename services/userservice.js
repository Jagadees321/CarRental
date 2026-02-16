import pool  from "../dbconfig/db.js";

const getuserbyid=async(id)=>{
    try {
        let sql="select * from users where userid=?";
        const [result]=await pool.execute(sql,[id]);
        return result;
    } catch (error) {
        return error;
    }
}

const getallusers=async()=>{
    try {
        let sql="select userid,username,email,phonenumber,adhaarNo,drivinglic,createdAt,role from users";
        const [result]=await pool.execute(sql);
        return result;
    } catch (error) {
        return error;
    }
}

const updateuser=async(id,user)=>{
    try {
        let {username,email,phonenumber,adhaarNo,drivinglic,role}=user;
        let sql="update users set username=?,email=?,phonenumber=?,adhaarNo=?,drivinglic=?,role=? where userid=?";
        const [result]=await pool.execute(sql,[username,email,phonenumber,adhaarNo,drivinglic,role,id]);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteuser=async(id)=>{   
    try {       
        let sql="delete from users where userid=?";
        const [result]=await pool.execute(sql,[id]);
        return result;
    } catch (error) {
        return error;
    }
}

export default {getuserbyid,getallusers,updateuser,deleteuser};

