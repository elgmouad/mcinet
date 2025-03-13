import {
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAILURE
} from '../Actions/Types.actions';


const initialState = { // Correction de la faute de frappe
  data: [],
  loading: false,
  error: null
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATISTICS_REQUEST:
      console.log("Requête en cours...");
      return { ...state, loading: true };

    case FETCH_STATISTICS_SUCCESS:
      console.log("Données reçues avec succès:", action.payload);
      return { ...state, loading: false, data: action.payload };

    case FETCH_STATISTICS_FAILURE:
      console.log("Erreur lors de la récupération des données:", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default statisticsReducer;