import { createStore, combineReducers, applyMiddleware,compose} from "redux";
import AuthReducer from "./AuthReducer";
import thunk from 'redux-thunk';

const combinedReducer = combineReducers({
    auth: AuthReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducer, composeEnhancer(applyMiddleware(thunk)),)