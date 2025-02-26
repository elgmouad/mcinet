import Instance from '../../Api/axios';
import {
    CREATE_ORDERMISSION_REQUEST,
    CREATE_ORDERMISSION_SUCCESS,
    CREATE_ORDERMISSION_FAILURE,
    UPDATE_ORDERMISSION_REQUEST,
    UPDATE_ORDERMISSION_SUCCESS,
    UPDATE_ORDERMISSION_FAILURE,
    DELETE_ORDERMISSION_REQUEST,
    DELETE_ORDERMISSION_SUCCESS,
    DELETE_ORDERMISSION_FAILURE,
    FETCH_ORDERMISSIONS_REQUEST,
    FETCH_ORDERMISSIONS_SUCCESS,
    FETCH_ORDERMISSIONS_FAILURE,
    UPDATESTATUS_ORDERMISSION_REQUEST,
    UPDATESTATUS_ORDERMISSION_SUCCESS,
    UPDATESTATUS_ORDERMISSION_FAILURE
} from '../Actions/Types.actions'

export const fetchOrderMissions = (role, userid) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ORDERMISSIONS_REQUEST})

        const response = await Instance.post(`/missions/getOrderMission`, {role, userid})
        dispatch({
            type: FETCH_ORDERMISSIONS_SUCCESS,
            payload: response.data.missions
        })
    } catch (error) {
        dispatch({
            type: FETCH_ORDERMISSIONS_FAILURE,
            payload: error.response.data.message || `Erreur lors de l'obtention de la liste des ordres missions`
        })
        throw error
    }
}

export const attributeOrderMission = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATESTATUS_ORDERMISSION_REQUEST})
        const response = await Instance.put(`/missions/updateOrderMissionStatus/${id}`, {status})
        dispatch({
            type: UPDATESTATUS_ORDERMISSION_SUCCESS,
            payload: response.data.mission
        })
        return true
    } catch (error) {
        dispatch({
            type: UPDATESTATUS_ORDERMISSION_FAILURE,
            payload: error.response.data.message || 'On peu pas executer cette mission'
        })
        return false
    }
}

export const createOrderMission = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDERMISSION_REQUEST})

        const response = await Instance.post('/missions/createOrderMission', data)
        dispatch({
            type: CREATE_ORDERMISSION_SUCCESS,
            payload: response.data.orderMission
        })

        return true
    } catch (error) {
        dispatch({
            type: CREATE_ORDERMISSION_FAILURE,
            payload: error.response.message || `Erreur lors de la creation de l'ordre mission`
        })

        return false
    }
}
export const updateOrderMission = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDERMISSION_REQUEST})

        const response = await Instance.put(`/missions/updateOrderMission/${id}`, data)
        dispatch({
            type: UPDATE_ORDERMISSION_SUCCESS,
            payload: response.data.orderMission
        })

        return true
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERMISSION_FAILURE,
            payload: error.response.data.message || `Erreur lors de la mise a jour de l'ordre mission`
        })

        return false
    }
}
export const deleteOrderMission = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDERMISSION_REQUEST})

        const response = await Instance.delete(`/missions/deleteOrderMission/${id}`)
        dispatch({
            type: DELETE_ORDERMISSION_SUCCESS,
            payload: response.data.orderMission
        })

        return true
    } catch (error) {
        dispatch({
            type: DELETE_ORDERMISSION_FAILURE,
            payload: error.response.data.message || `Erreur lors de la supression de l'ordre mission`
        })

        return false
    }
}