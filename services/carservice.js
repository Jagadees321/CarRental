import pool from '../dbconfig/db.js';

const addcar=async(car)=>{
    try {
        let {brand,model,year,registration_no,userid,per_day_price,status,carimages,location}=car;
        console.log(car);
        
        let sql="insert into cars(brand,model,year,registration_no,userid,per_day_price,status,carimages,location) values(?,?,?,?,?,?,?,?,?)";
        let [result]=await pool.execute(sql,[brand,model,year,registration_no,userid,per_day_price,status,carimages,location]);
        return result;
    } catch (error) {
        return error
    }
}
const getcars=async()=>{
    try {
        let sql="select * from cars";
        let [result]=await pool.execute(sql);
        return result;
    } catch (error) {
        return error
    }
}
const getcarbyid=async(id)=>{
    try {
        let sql="select * from cars where carid=?"
        let [result]=await pool.execute(sql, [id]);
        return result;
    } catch (error) {
        return error
    }
}

const updatecar=async(car,id)=>{
    try {
        let {brand,model,year,registration_no,userid,per_day_price,status,location}=car;
        let sql="update cars set brand=?,model=?,year=?,registration_no=?,userid=?,per_day_price=?,status=?,location=? where carid=?";
        let [result]=await pool.execute(sql,[brand,model,year,registration_no,userid,per_day_price,status,location,id]);
        return result;
    } catch (error) {
        return error.message;
    }
}

const deletecar=async(id)=>{
    try {
        let sql="delete from cars where carid=?";
        let [result]=await pool.execute(sql,[id]);
        return result;
    } catch (error) {
        return error.message;
    }
}

export default {addcar,getcars,getcarbyid,updatecar,deletecar};