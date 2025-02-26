import express from 'express';
import {getUser, updateUser } from '../controllers/user.controller.js'
const router = express.Router();

router.get('/user', getUser)
router.put("/update/:id", updateUser)

export default router