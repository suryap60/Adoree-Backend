import express from 'express'
import connectDB from './config/db.js';
import router from './router/router.js';


const app = express();
app.use(express.json())

connectDB()

app.use('/api',router)

app.listen(2023,()=>{
    console.log('Server is running on http:localhost:2023')
})