import { useNavigate } from 'react-router-dom';
import { ROLE_PERMISSIONS } from '../../Components/Utilities/role.permissions'
import Instance from '../../Api/axios';
import { 
    LOGINREQUEST,
    LOGINSUCCESS,
    LOGINFAILED,
    LOGOUT,
    CHECKAUTH
} from './Types.actions';

export const loginUser = (credentials) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
        dispatch({ type: LOGINREQUEST })

        const response = await Instance.post('/auth/login', credentials);
        // )
        dispatch({
            type: LOGINSUCCESS,
            payload: {
                user: response.data.user,
                token: response.data.token,
                role: response.data.user.profile
            }
        })

    } catch (error) {
        console.log("Error from Login page: ", error.response.data)
        dispatch({
            type: LOGINFAILED,
            payload: error.response.data.message || 'Incorrect Cridentiels'
        });
        throw error
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    dispatch({ type: LOGOUT })
    // navigate('/')
}

export const verifyUser = () => (dispatch) => {
    const token = localStorage.getItem('authToken');

    if(token) {
        Instance.post('/auth/verifyToken');
    }
}