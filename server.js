import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mysql from 'mysql2';
import Authroute from './routes/Authroute.js';
import userroute from './routes/userroute.js';
import pool from './dbconfig/db.js'
dotenv.config();


const port = Number(process.env.PORT) || 4000;
const app = express();
app.use(cors());
app.use(express.json());
 
const testdbconnect=async()=>{
    try {
        const connection= await pool.getConnection();
        console.log("connected to database");
        connection.release();       
    } catch (error) {
        console.log("error connecting to database",error);
    }
}
testdbconnect()
app.get('/', (req, res) => {
    res.status(200).json("server is running");
});

//routes
app.use('/api/auth',Authroute);
app.use('/api/user',userroute);
app.listen(port, () => {
    console.log("server started at http://localhost:" + port);
});