import Instance from '../../Api/axios';
import {
    FETCH_CONTROLS_REQUEST,
    FETCH_CONTROLS_SUCCESS,
    FETCH_CONTROLS_FAILURE,
    CREATE_CONTROL_REQUEST,
    CREATE_CONTROL_SUCCESS,
    CREATE_CONTROL_FAILURE,
    UPDATE_CONTROL_REQUEST,
    UPDATE_CONTROL_SUCCESS,
    UPDATE_CONTROL_FAILURE,
    DELETE_CONTROL_REQUEST,
    DELETE_CONTROL_SUCCESS,
    DELETE_CONTROL_FAILURE
} from './Types.actions';

export const fetchControls = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONTROLS_REQUEST })

        const response = await Instance.get('/control/list');
        dispatch({
            type: FETCH_CONTROLS_SUCCESS,
            payload: response.data.controls
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONTROLS_FAILURE,
            payload: error.response?.data.message || 'Erreur lors du chargement des contrôles'
        });
        throw error
    }
}
export const createControl = (data, ControlObjectType) => async (dispatch) => {
    try {
        switch (ControlObjectType.toUpperCase()) {
            case "CONTROLE_LOI_34":
                return await dispatch(createControleLoi34(data));
            case "CONTROLE_LOI_79_LOCAL":
                return await dispatch(createControleLoi34(data));
            case "CONTROLE_LOI_79_IMPORTATION":
                console.log("Enter to CONTROLE_LOI_79_IMPORTATION to CREATE :",data);
                return await dispatch(createControleLoi97Importation(data));
            default:
                dispatch({
                    type: CREATE_CONTROL_FAILURE,
                    payload: "Type de contrôle inconnu"
                });
                return false;
        }
    } catch (error) {
        dispatch({
            type: CREATE_CONTROL_FAILURE,
            payload: error.response?.data.message || 'Impossible de créer ce contrôle'
        });
        return false;
    }
};

export const createControleLoi3108 = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTROL_REQUEST });

        console.log("Données envoyées :", data);
        const response = await Instance.post('/control/add', data);
        
        dispatch({
            type: CREATE_CONTROL_SUCCESS,
            payload: response.data.control
        });

        return true;
    } catch (error) {
        dispatch({
            type: CREATE_CONTROL_FAILURE,
            payload: error.response?.data.message || 'Impossible de créer ce contrôle'
        });

        return false;
    }
};

export const createControleLoi2409Importation = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CONTROL_REQUEST });

        console.log("Données envoyées :", data);
        const response = await Instance.post('/control/add/importation', data);
        
        dispatch({
            type: CREATE_CONTROL_SUCCESS,
            payload: response.data.control
        });

        return true;
    } catch (error) {
        dispatch({
            type: CREATE_CONTROL_FAILURE,
            payload: error.response?.data.message || 'Impossible de créer ce contrôle'
        });

        return false;
    }
};

export const updateControl = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CONTROL_REQUEST })

        const response = await Instance.put(`/control/update/${id}`, data)
        dispatch({
            type: UPDATE_CONTROL_SUCCESS,
            payload: response.data.control
        })

        return true
    } catch (error) {
        dispatch({
            type: UPDATE_CONTROL_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la mise à jour du contrôle'
        })
        return false
    }
}

export const deleteControl = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTROL_REQUEST })

        const response = await Instance.delete(`/control/delete/${id}`)
        dispatch({
            type: DELETE_CONTROL_SUCCESS,
            payload: id
        })

        return true
    } catch (error) {
        dispatch({
            type: DELETE_CONTROL_FAILURE,
            payload: error.response?.data.message || 'Erreur lors de la suppression du contrôle'
        })
        return false
    }
}