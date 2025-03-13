import expres from 'express'
import { fetchObjectById } from '../controllers/object.controller.js'

const router = expres.Router()

router.get('/getObject', fetchObjectById)

export default router