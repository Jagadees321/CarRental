import pool from '../dbconfig/db.js';

const createPayment = async (payment) => {
    try {
        const { bookingid, userid, amount, payment_method, transaction_id, status } = payment;
        const sql = `INSERT INTO payment (bookingid, userid, amount, payment_method, transaction_id, status)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(sql, [
            bookingid, userid, amount, payment_method, transaction_id || null, status || 'pending'
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

const getPaymentByPaymentId = async (paymentid) => {
    try {
        const sql = `SELECT p.*, b.pickup_location, b.drop_location, b.start_date, b.end_date,
                     u.username, u.email, c.brand, c.model
                     FROM payment p
                     JOIN booking b ON p.bookingid = b.bookingid
                     JOIN users u ON p.userid = u.userid
                     JOIN cars c ON b.carid = c.carid
                     WHERE p.paymentid = ?`;
        const [result] = await pool.execute(sql, [paymentid]);
        return result[0] || null;
    } catch (error) {
        throw error;
    }
};

const getPaymentByBookingId = async (bookingid) => {
    try {
        const sql = `SELECT p.*, b.pickup_location, b.drop_location,
                     DATE_FORMAT(b.start_date, '%Y-%m-%d') AS start_date,
                     DATE_FORMAT(b.end_date, '%Y-%m-%d') AS end_date,
                     u.username, c.brand, c.model
                     FROM payment p
                     JOIN booking b ON p.bookingid = b.bookingid
                     JOIN users u ON p.userid = u.userid
                     JOIN cars c ON b.carid = c.carid
                     WHERE p.bookingid = ?`;
        const [result] = await pool.execute(sql, [bookingid]);
        return result[0] || null;
    } catch (error) {
        throw error;
    }
};

const getPaymentsByUserId = async (userid) => {
    try {
        const sql = `SELECT p.*, b.pickup_location, b.drop_location,
                     DATE_FORMAT(b.start_date, '%Y-%m-%d') AS start_date,
                     DATE_FORMAT(b.end_date, '%Y-%m-%d') AS end_date,
                     DATE_FORMAT(p.paid_at, '%Y-%m-%d %H:%i:%s') AS paid_at,
                     DATE_FORMAT(p.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
                     c.brand, c.model
                     FROM payment p
                     JOIN booking b ON p.bookingid = b.bookingid
                     JOIN cars c ON b.carid = c.carid
                     WHERE p.userid = ?
                     ORDER BY p.createdAt DESC`;
        const [result] = await pool.execute(sql, [userid]);
        return result;
    } catch (error) {
        throw error;
    }
};

const getAllPayments = async () => {
    try {
        const sql = `SELECT p.paymentid, p.bookingid, p.userid, p.amount, p.payment_method,
                     p.transaction_id, p.status, DATE_FORMAT(p.paid_at, '%Y-%m-%d %H:%i:%s') AS paid_at,
                     DATE_FORMAT(p.createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt,
                     u.username, u.email, c.brand, c.model
                     FROM payment p
                     JOIN users u ON p.userid = u.userid
                     JOIN booking b ON p.bookingid = b.bookingid
                     JOIN cars c ON b.carid = c.carid
                     ORDER BY p.createdAt DESC`;
        const [result] = await pool.execute(sql);
        return result;
    } catch (error) {
        throw error;
    }
};

const updatePaymentStatus = async (paymentid, status, transaction_id = null) => {
    try {
        const paid_at = status === 'completed' ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null;
        const sql = `UPDATE payment SET status = ?, transaction_id = COALESCE(?, transaction_id), paid_at = COALESCE(?, paid_at) WHERE paymentid = ?`;
        const [result] = await pool.execute(sql, [status, transaction_id, paid_at, paymentid]);
        return result;
    } catch (error) {
        throw error;
    }
};

export default {
    createPayment,
    getPaymentByPaymentId,
    getPaymentByBookingId,
    getPaymentsByUserId,
    getAllPayments,
    updatePaymentStatus,
};
