import expres from 'express'
import { fetchProducts } from '../controllers/product.controller.js'

const router = expres.Router()

router.get('/All', fetchProducts)

export default router