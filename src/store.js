import { createStore, combineReducers, applyMiddleware,compose} from "redux";
import AuthReducer, {errorHandler} from "./securitReducer/AuthReducer";
import thunk from 'redux-thunk';
import EmployeeReducer from "./reducer/EmployeeReducer";

const combinedReducer = combineReducers({
    auth: AuthReducer,
    error: errorHandler,
    employeeDetails: EmployeeReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(combinedReducer, composeEnhancer(applyMiddleware(thunk)),)