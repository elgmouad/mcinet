import express from 'express'
import { getEnterpriseList, addEnterprise, searchEnterprise } from '../controllers/enterprise.controller.js'

const router = express.Router();

router.get('/list', getEnterpriseList)
router.get('/search', searchEnterprise)
router.post('/add', addEnterprise)

export default router;