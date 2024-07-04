import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authroutes from './routes/auth.routes.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to Mongodb')
}).catch((err)=>{
    console.log(err)
})

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('server listen on port 3000!')
});


app.use("/api/user",userRoutes)
app.use("/api/auth",authroutes)