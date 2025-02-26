import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './Reducers/auth.reducer.jsx'
import orderMissionReducer from './Reducers/orderMission.reducer.jsx'
import enterpriseReducer from './Reducers/enterprise.reducer.jsx'
import controlReducer from "./Reducers/control.reducer.jsx";

const rootReducer = combineReducers({
    auth: authReducer,
    orderMission: orderMissionReducer,
    enterprise: enterpriseReducer,
    control: controlReducer
});

const initialState = {};
const middleware = [thunk];
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;