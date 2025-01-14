import express from 'express'
import connectDB from './config/db.js';
import router from './router/router.js';
import { config } from 'dotenv';
import cors from "cors"


const app = express();
app.use(express.json())
app.use(cors())


config()
connectDB()

app.use('/api',router)

const port = process.env.PORT
// console.log(port)


app.listen(port,()=>{
    console.log(`Server is running on http:localhost:${port}`)
})