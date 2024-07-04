import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"user created successfully"});
    }catch(err){
        next(err);
    }
   
}

export const signin =async(req,res,next)=>{
    const{email,password}=req.body
    try{
        const validUser=await User.findOne({email})
        if(!validUser) return next(errorHandler(404,'user not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'wrong credentials'))
            const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const{password:hashedPassword,...rest}=validUser._doc;

        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);

    }catch(error){
        next(error)
    }
}