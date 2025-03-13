import expres from 'express'
import { fetchStatisticsByRole } from '../controllers/statistics.controller.js'

const router = expres.Router()

router.get('/', fetchStatisticsByRole)

export default router