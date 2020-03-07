import { createStore, combineReducers, applyMiddleware,compose} from "redux";
import AuthReducer, {errorHandler} from "./securitReducer/AuthReducer";
import thunk from 'redux-thunk';

const combinedReducer = combineReducers({
    auth: AuthReducer,
    error: errorHandler

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducer, composeEnhancer(applyMiddleware(thunk)),)