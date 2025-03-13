import Instance from '../../Api/axios';
import { 
    FETCH_ENTERPRISE_ID_REQUEST,
    FETCH_ENTERPRISE_ID_SUCCESS,
    FETCH_ENTERPRISE_ID_FAILURE,
    FETCH_ENTERPRISES_REQUEST,
    FETCH_ENTERPRISES_SUCCESS,
    FETCH_ENTERPRISES_FAILURE,
    ADD_ENTERPRISE_REQUEST,
    ADD_ENTERPRISE_SUCCESS,
    ADD_ENTERPRISE_FAILURE,
    UPDATE_ENTERPRISE_REQUEST,
    UPDATE_ENTERPRISE_SUCCESS,
    UPDATE_ENTERPRISE_FAILURE
    } from './Types.actions';

export const fetchEnterprise = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_ENTERPRISES_REQUEST})

        const response = await Instance.get('/enterprise/list');
        dispatch({
            type: FETCH_ENTERPRISES_SUCCESS,
            payload: response.data.enterprises
        })
    } catch (error) {
        dispatch({
            type: FETCH_ENTERPRISES_FAILURE,
            payload: error.response.data.message || 'Error fetching enterprise list'
        })
    }
}

export const getEnterpriseById = (id) => async (dispatch) => {
    try {
        dispatch({type: FETCH_ENTERPRISE_ID_REQUEST})

        const response = await Instance.post('/enterprise/getEnterprise', {id})
        dispatch({
            type: FETCH_ENTERPRISE_ID_SUCCESS,
            payload: response?.data?.enterprise
        })
    } catch (error) {
        dispatch({
            type: FETCH_ENTERPRISE_ID_FAILURE,
            payload: error?.response?.data.message || 'Error fetching enterprise'
        })
    }
}

export const addEnterprise = (data) => async (dispatch) => {
    try {
        dispatch({type: ADD_ENTERPRISE_REQUEST})

        const response = await Instance.post('/enterprise/add', data)
        dispatch({
            type: ADD_ENTERPRISE_SUCCESS,
            payload: response.data.enterprise
        });
        return true

    } catch (error) {
        dispatch({
            type: ADD_ENTERPRISE_FAILURE,
            payload: error.response.message || 'Error while add enterprise'
        });

        return false
    }
}
export const updateEntreprise = (ice, data) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_ENTERPRISE_REQUEST})

        const response = await Instance.put(`/enterprise/update/${ice}`, data)
        dispatch({
            type: UPDATE_ENTERPRISE_SUCCESS,
            payload: response.data.enterprise
        })
        return true;
    } catch (error) {
        dispatch({
            type: UPDATE_ENTERPRISE_FAILURE,
            payload: error.response.data.message || 'Update enterprise error'
        });
        return false
    }
}