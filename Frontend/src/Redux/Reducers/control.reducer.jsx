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
} from '../Actions/Types.actions';

const initalState = {
    controls : [],
    loading: false,
    error: null
}

function controlReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_CONTROLS_REQUEST:
        case CREATE_CONTROL_REQUEST:
        case UPDATE_CONTROL_REQUEST:
        case DELETE_CONTROL_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        
        case FETCH_CONTROLS_SUCCESS:
            return {
                ...state,
                loading: false,
                controls: action.payload,
                error: null,
            }
        case CREATE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                controls: [...state.controls, action.payload],
                error: null
            };
        case UPDATE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                controls: state.controls.map(control =>
                    control.id === action.payload.id ? action.payload : control
                ),
                error: null
            };
        case DELETE_CONTROL_SUCCESS:
            return {
                ...state,
                loading: false,
                controls: state.controls.filter(control => control.id !== action.payload),
                error: null
            };
        
        case FETCH_CONTROLS_FAILURE:
        case CREATE_CONTROL_FAILURE:
        case UPDATE_CONTROL_FAILURE:
        case DELETE_CONTROL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
    
        default:
            return state;
    }
}

export default controlReducer;