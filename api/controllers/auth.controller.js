import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcrypt.hashSync(password,10)
    const newUser=new User({username,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"user created successfully"});
    }catch(err){
        res.status(500).json(err.message);
    }
   
}