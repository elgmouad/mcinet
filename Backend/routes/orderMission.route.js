import express from 'express';
import {
    getOrderMission,
    createOrderMission,
    updateOrderMission,
    updateOrderMissionStatus,
    deleteOrderMission,
    getCadre,
    searchCadre,
    getServiceCars,
    getObjectOptions,
    getDestinations,
    getObjectTypesOptions
} from '../controllers/orderMission.controller.js'

const router = express.Router();

router.post('/getOrderMission', getOrderMission)
router.get('/getServiceCars', getServiceCars)
router.get('/getObjectOptions', getObjectOptions)

router.get('/getObjectTypes/:objectId', getObjectTypesOptions)

router.get('/getDestinations', getDestinations)
router.get('/getCadre', getCadre)
router.post('/searchCadre', searchCadre)
router.post('/createOrderMission', createOrderMission)
router.put('/updateOrderMission/:id', updateOrderMission)
router.put('/updateOrderMissionStatus/:id', updateOrderMissionStatus)
router.delete('/deleteOrderMission/:id', deleteOrderMission)

export default router;


