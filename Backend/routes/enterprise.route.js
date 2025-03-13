import express from 'express'
import { getEnterpriseList, addEnterprise, getEnterpriseById } from '../controllers/enterprise.controller.js'

const router = express.Router();

router.get('/list', getEnterpriseList)
router.post('/getEnterprise', getEnterpriseById)
router.post('/add', addEnterprise)

export default router;