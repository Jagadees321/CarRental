import pool from "../dbconfig/db.js";
import bcrypt from 'bcryptjs';

const registerUser = async (user) => {
    try {
        let { username, email, password, phonenumber, Role } = user;
        const role = (Role || user.role || 'customer').toLowerCase();
        const validRole = role === 'owner' ? 'owner' : 'customer';
        password = await bcrypt.hash(password, 10);
        const sql = "insert into users(username,email,password,phonenumber,Role) values(?,?,?,?,?)";
        const [result] = await pool.execute(sql, [username, email, password, phonenumber || null, validRole]);
        return result;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const sql = "select userid,username,email,password,phonenumber,Role from users where email=?";
        const [result] = await pool.execute(sql, [email]);
        if (result.length > 0) {
            const isMatch = await bcrypt.compare(password, result[0].password);
            if (isMatch) {
                const user = { userid: result[0].userid, username: result[0].username, email: result[0].email, Role: result[0].Role || 'customer' };
                return { status: 200, message: "login successful", user };
            }
            return { status: 400, message: "invalid password" };
        }
        return { status: 404, message: "user not found" };
    } catch (error) {
        return { status: 500, message: "internal server error" };
    }
};
export default {registerUser,login};