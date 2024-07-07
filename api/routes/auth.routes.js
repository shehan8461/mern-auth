import express from 'express'
import { signin, signup,google,signout } from '../controllers/auth.controller.js';


const router=express.Router();

router.post("/signup",signup)//register
router.post("/signin",signin)//login
router.post("/google",google)
router.get('/signout',signout)

export default router