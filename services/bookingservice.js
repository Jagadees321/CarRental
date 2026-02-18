import pool from '../dbconfig/db.js';

// create table jagga.booking
// (
//     bookingid int auto_increment primary key,
//     userid int,
//     carid int,
//     pickup_location varchar(60),
//     drop_location varchar(60),
//     start_date date,
//     end_date date,
//     status varchar(50),
//     total_amount double(5,2),
//     createAt datetime default now()
// );
const addbooking=async(booking)=>{
    try {
        const {userid,carid,pickup_location,drop_location,start_date,end_date,status,total_amount}=booking;
        let sql="insert into booking(userid,carid,pickup_location,drop_location,start_date,end_date,status,total_amount) values(?,?,?,?,?,?,?,?)";
        let [result]=await pool.execute(sql,[userid,carid,pickup_location,drop_location,start_date,end_date,status,total_amount]);
        return result;
    } catch (error) {
        throw error;
    }
}

const getbookingbyuserid=async(userid)=>{
    try {
        let sql="select b.bookingid,b.userid,b.carid,b.pickup_location,b.drop_location,b.start_date,b.end_date,b.status,b.total_amount,c.car_name from booking b join cars c on b.carid=c.carid where b.userid=?";
        let [result]=await pool.execute(sql,[userid]);
        return result;
    } catch (error) {
        throw error;
    }
}

const getbookingbybookingid=async(bookingid)=>{
    try {
        let sql="select b.bookingid,b.userid,b.carid,b.pickup_location,b.drop_location,b.start_date,b.end_date,b.status,b.total_amount,c.car_name from booking b join cars c on b.carid=c.carid where b.bookingid=?";
        let [result]=await pool.execute(sql,[bookingid]);
        return result;
    } catch (error) {
        throw error;
    }
}
const getallbookings=async()=>{
    try {
        let sql = `
            SELECT
                b.bookingid, b.userid, b.carid,
                b.pickup_location, b.drop_location,
                DATE_FORMAT(b.start_date, '%Y-%m-%d') AS start_date,
                DATE_FORMAT(b.end_date, '%Y-%m-%d') AS end_date,
                b.status, b.total_amount,
                DATE_FORMAT(b.createAt, '%Y-%m-%d %H:%i:%s') AS createAt,
                u.username, u.email, u.phonenumber, u.adhaarNo, u.drivinglic,
                DATE_FORMAT(u.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt, u.role,
                c.brand, c.model, c.year, c.registration_no, c.per_day_price, c.carimages, c.location
            FROM booking b
            INNER JOIN users u ON b.userid = u.userid
            INNER JOIN cars c ON b.carid = c.carid
        `;
        let [result] = await pool.execute(sql);
        return result;
    } catch (error) {
        throw error;
    }
}

const updatebookingstatus=async(bookingid,status)=>{
    try {
        let sql="update booking set status=? where bookingid=?";
        let [result]=await pool.execute(sql, [status, bookingid]);
        return result;
    } catch (error) {
        throw error;
    }
}

export default {addbooking,getbookingbyuserid,getbookingbybookingid,getallbookings,updatebookingstatus};