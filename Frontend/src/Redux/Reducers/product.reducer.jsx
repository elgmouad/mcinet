import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE
} from '../Actions/Types.actions';


const initialState = { // Correction de la faute de frappe
  data: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      console.log("Requête en cours...");
      return { ...state, loading: true };

    case FETCH_PRODUCT_SUCCESS:
      console.log("Données reçues avec succès:", action.payload);
      return { ...state, loading: false, products: action.payload };

    case FETCH_PRODUCT_FAILURE:
      console.log("Erreur lors de la récupération des données:", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;