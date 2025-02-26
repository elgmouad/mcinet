import { 
    FETCH_ENTERPRISES_REQUEST,
    FETCH_ENTERPRISES_SUCCESS,
    FETCH_ENTERPRISES_FAILURE,
    ADD_ENTERPRISE_REQUEST,
    ADD_ENTERPRISE_SUCCESS,
    ADD_ENTERPRISE_FAILURE,
    UPDATE_ENTERPRISE_REQUEST,
    UPDATE_ENTERPRISE_SUCCESS,
    UPDATE_ENTERPRISE_FAILURE
    } from '../Actions/Types.actions';

const initialState = {
    enterprises: [],
    loading: false,
    error: null
};

function enterpriseReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTERPRISES_REQUEST:
        case ADD_ENTERPRISE_REQUEST:
        case UPDATE_ENTERPRISE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        
            
        case FETCH_ENTERPRISES_SUCCESS:
            return {
                ...state,
                loading: false,
                enterprises: action.payload
            }
        case ADD_ENTERPRISE_SUCCESS:
            return {
                ...state,
                enterprises: [
                    ...state.enterprises,
                    action.payload
                ]
            }
        case UPDATE_ENTERPRISE_SUCCESS:
            return {
                ...state,
                loading: false,
                enterprises: state.enterprises.map(ent => {
                    ent.ICE === action.payload.ICE ? action.payload : ent
                } )
            }

        
        case FETCH_ENTERPRISES_FAILURE:
        case ADD_ENTERPRISE_FAILURE:
        case UPDATE_ENTERPRISE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}

export default enterpriseReducer;