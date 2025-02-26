import express from 'express';
import { login, logout, signup, verifyToken } from '../controllers/auth.controller.js'
const router = express.Router();

router.post("/logout", logout)
router.post("/signup", signup) 
router.post("/login", login)
router.post('/verify', verifyToken)

export default router;
