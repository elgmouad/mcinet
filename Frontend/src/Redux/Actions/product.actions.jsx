import Instance from '../../Api/axios';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE

} from './Types.actions'

// Action pour récupérer les Object des controle
export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST });

        const response = await Instance.get("/Products/All");

        console.log("Réponse de l'API (fetchProducts):", response.data);

        dispatch({
            type: FETCH_PRODUCT_SUCCESS,
            payload: response.data.products, // Assurez-vous que c'est bien response.data.data
        });
    } catch (error) {
        console.error("Erreur dans fetchProducts:", error.response?.data || error.message);

        dispatch({
            type: FETCH_PRODUCT_FAILURE,
            payload: error.response?.data?.message || 'Erreur lors de la récupération de Produit',
        });
        throw error;
    }
};