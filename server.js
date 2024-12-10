import express from 'express'
import connectDB from './config/db.js';
import router from './router/router.js';
import { config } from 'dotenv';


const app = express();
app.use(express.json())


config()
connectDB()

app.use('/api',router)

const port = process.env.PORT
// console.log(port)


app.listen(port,()=>{
    console.log('Server is running on http:localhost:2025')
})