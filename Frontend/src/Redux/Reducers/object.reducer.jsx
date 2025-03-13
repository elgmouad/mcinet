import {
  FETCH_OBJECT_REQUEST,
  FETCH_OBJECT_SUCCESS,
  FETCH_OBJECT_FAILURE
} from '../Actions/Types.actions';


const initialState = { // Correction de la faute de frappe
  data: [],
  loading: false,
  error: null
};

const objectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBJECT_REQUEST:
      console.log("Requête en cours...");
      return { ...state, loading: true };

    case FETCH_OBJECT_SUCCESS:
      console.log("Données reçues avec succès:", action.payload.object);
      return { ...state, loading: false, data: action.payload.object };

    case FETCH_OBJECT_FAILURE:
      console.log("Erreur lors de la récupération des données:", action.payload);
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default objectReducer;