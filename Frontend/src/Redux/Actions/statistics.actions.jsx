import Instance from '../../Api/axios';
import {
    FETCH_STATISTICS_REQUEST,
    FETCH_STATISTICS_SUCCESS,
    FETCH_STATISTICS_FAILURE

} from './Types.actions'

// Action pour récupérer les statistiques
export const fetchStatistics = (role) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_STATISTICS_REQUEST });

        console.log("Le Role par la methode fetch : -----------------------------------", role);
        const response = await Instance.get("/statistics", {
            params: { role },
        });

        console.log("Réponse de l'API (fetchStatistics):", response.data);

        dispatch({
            type: FETCH_STATISTICS_SUCCESS,
            payload: response.data.data, // Assurez-vous que c'est bien response.data.data
        });
    } catch (error) {
        console.error("Erreur dans fetchStatistics:", error.response?.data || error.message);

        dispatch({
            type: FETCH_STATISTICS_FAILURE,
            payload: error.response?.data?.message || 'Erreur lors de la récupération des statistiques',
        });
        throw error;
    }
};