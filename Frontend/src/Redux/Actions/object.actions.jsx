import Instance from '../../Api/axios';
import {
    FETCH_OBJECT_REQUEST,
    FETCH_OBJECT_SUCCESS,
    FETCH_OBJECT_FAILURE

} from './Types.actions'

// Action pour récupérer les Object des controle
export const fetchObjectById = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_OBJECT_REQUEST });

        console.log("Le Id de Controle par la methode fetch : -----------------------------------", id);
        const response = await Instance.get("/object/getObject", {
            params: { id },
        });

        console.log("Réponse de l'API (fetchControleObject):", response.data);

        dispatch({
            type: FETCH_OBJECT_SUCCESS,
            payload: response.data, // Assurez-vous que c'est bien response.data.data
        });
    } catch (error) {
        console.error("Erreur dans fetchControleObject:", error.response?.data || error.message);

        dispatch({
            type: FETCH_OBJECT_FAILURE,
            payload: error.response?.data?.message || 'Erreur lors de la récupération de Object',
        });
        throw error;
    }
};