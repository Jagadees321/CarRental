import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.host || '127.0.0.1',
    port: Number(process.env.dbport) || 3306,
    user: process.env.user || 'root',
    password: process.env.password || '',
    database: process.env.database || process.env.dbname,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000,
});

export default pool;