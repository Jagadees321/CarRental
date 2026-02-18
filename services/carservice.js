import pool from '../dbconfig/db.js';

const addcar = async (car) => {
    try {
        const { brand, model, year, registration_no, userid, per_day_price, status } = car;
        const sql = "insert into cars(brand,model,year,registration_no,userid,per_day_price,status) values(?,?,?,?,?,?,?)";
        const [result] = await pool.execute(sql, [brand, model, year, registration_no, userid, per_day_price, status || 'AVAILABLE']);
        return result;
    } catch (error) {
        throw error;
    }
};

const getcars = async () => {
    try {
        const sql = "select carid,brand,model,year,registration_no,userid,per_day_price,status,DATE_FORMAT(createAt,'%Y-%m-%d %H:%i:%s') as createAt from cars order by createAt desc";
        const [result] = await pool.execute(sql);
        return result;
    } catch (error) {
        throw error;
    }
};

const getcarsbyowner = async (userid) => {
    try {
        const sql = "select carid,brand,model,year,registration_no,userid,per_day_price,status,DATE_FORMAT(createAt,'%Y-%m-%d %H:%i:%s') as createAt from cars where userid=? order by createAt desc";
        const [result] = await pool.execute(sql, [userid]);
        return result;
    } catch (error) {
        throw error;
    }
};
const getcarbyid=async(id)=>{
    try {
        let sql="select * from cars where carid=?"
        let [result]=await pool.execute(sql, [id]);
        return result;
    } catch (error) {
        return error
    }
}

const updatecar = async (car, id) => {
    try {
        const { brand, model, year, registration_no, userid, per_day_price, status } = car;
        const sql = "update cars set brand=?,model=?,year=?,registration_no=?,userid=?,per_day_price=?,status=? where carid=?";
        const [result] = await pool.execute(sql, [brand, model, year, registration_no, userid, per_day_price, status || 'AVAILABLE', id]);
        return result;
    } catch (error) {
        throw error;
    }
};

const deletecar=async(id)=>{
    try {
        let sql="delete from cars where carid=?";
        let [result]=await pool.execute(sql,[id]);
        return result;
    } catch (error) {
        return error.message;
    }
}

export default { addcar, getcars, getcarsbyowner, getcarbyid, updatecar, deletecar };