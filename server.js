import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Authroute from './routes/Authroute.js';
import userroute from './routes/userroute.js';
import pool from './dbconfig/db.js';
import carroute from './routes/carroute.js';
import bookingroute from './routes/bookingroute.js';
import paymentroute from './routes/paymentroute.js';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const testdbconnect = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("connected to database");
        connection.release();
    } catch (error) {
        console.log("error connecting to database", error);
    }
};
testdbconnect();

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "server is running" });
});
app.post('/gettotalamount', async (req, res) => {
   let {carid,startdate,enddate}=req.body;
   let sql="select per_day_price from cars where carid=?";
   console.log(carid);
   startdate=new Date(startdate);
   enddate=new Date(enddate);
   let [result]=await pool.execute(sql,[carid]);
   const perDayPrice = result[0]?.per_day_price ?? 0;
   const diffMs = enddate - startdate;
   const diffDays = diffMs / (24 * 60 * 60 * 1000);
   const days = Math.ceil(diffDays) + 1; 
   const totalAmount = perDayPrice * days;
   return res.status(200).json({ ...result[0], totalAmount });
});

//routes
app.use('/api/auth',Authroute);
app.use('/api/user',userroute);
app.use('/api/car',carroute);
app.use('/api/booking', bookingroute);
app.use('/api/payment', paymentroute);

// Serve frontend (build first: cd frontend && npm run build)
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDist));
// SPA fallback: for GET requests not under /api, send index.html (Express 5 does not support app.get('*', ...))
app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'), (err) => err && next(err));
});

app.listen(port, () => {
    console.log("server started at http://localhost:" + port);
});