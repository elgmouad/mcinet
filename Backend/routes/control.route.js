import expres from 'express'
import {fetchControls, 
    createControl,
    updateControls,
    deleteControl,
    createControlLoi97Importation,
    createControlLoi7715} from '../controllers/control.controller.js'

const router = expres.Router()

router.get('/list', fetchControls)
router.put('/update/:id', updateControls)
router.post('/add', createControl)
router.post('/add/importation',createControlLoi97Importation)
router.post('/add/77_15_company',createControlLoi7715)
router.delete('/delete/:id', deleteControl)

export default router