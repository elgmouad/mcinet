import expres from 'express'
import {fetchControls, createControl, updateControls, deleteControl, createControlLoi97Importation} from '../controllers/control.controller.js'

const router = expres.Router()

router.get('/list', fetchControls)
router.put('/update/:id', updateControls)
router.post('/add', createControl)
router.post('/add/importation',createControlLoi97Importation)
router.delete('/delete/:id', deleteControl)

export default router