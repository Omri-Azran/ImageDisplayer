import express from "express"
import dotenv from "dotenv"
import cors from 'cors' 


import homeRouter from './routers/home.router.js'
dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(cors());

app.use(homeRouter)

app.listen(PORT, ()=>{console.log(`server is connected on port ${PORT}`)})