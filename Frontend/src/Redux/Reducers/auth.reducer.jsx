import { LOGINFAILED, LOGINREQUEST, LOGINSUCCESS, LOGOUT } from "../Actions/Types.actions";
import { ROLE_PERMISSIONS, ROLE_NAMES,  ROLES } from '../../Components/Utilities/role.permissions'

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const storedToken = localStorage.getItem('token') || null;
const storedRole = localStorage.getItem('role') || null;
const isAuth = !!(storedUser && storedToken && storedRole)

const getPermissions = (role) => {
    if(!role || !ROLE_PERMISSIONS[ROLES[role.toUpperCase()]]) return [];
    return ROLE_PERMISSIONS[ROLES[role.toUpperCase()]]
}

const initialState = {
    isAuthenticated: isAuth || false,
    user: storedUser || null,
    token: storedToken || null,
    role: storedRole || null,
    permissions: getPermissions(storedRole),
    loading: false,
    error: null,
};


const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOGINREQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGINSUCCESS:
            console.log('State update check: ')
            console.log("-- State: ", state)
            const permissions = getPermissions(action.payload.role.toUpperCase())
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role',  action.payload.role.toUpperCase());
            localStorage.setItem('permissions',  JSON.stringify(permissions));

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role.toUpperCase(),
                permissions: getPermissions(storedRole),
                loading: false,
                error: null
            };
        
        case LOGINFAILED:
            return {
                ...state,
                user: null,
                token: null,
                role: null,
                loading: false,
                error: action.payload,
            };


        case LOGOUT:
            return {
                ...initialState
            };
    
        default:
            return state;
    }

}

export default authReducer;