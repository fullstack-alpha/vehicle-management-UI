import React from 'react'

const initialState ={
    validToken: false,
    user:{}
}

function setValidToken(token){
    if(token)
        return true
    else
        return false
}

export default function AuthReducer(state=initialState, action) {
        switch (action.type) {
            case "SET_USER_SESSION":
                return{
                    ...state,
                    validToken: setValidToken(action.payload),
                    user:action.payload
                }
            default:
                return state
        }
}

export function errorHandler(state={errorFlag: false,status: 0, error: "", message: ""}, {type, payload}){
    switch (type) {
        case "ERROR":
            return {
                ...state,
                status: payload.status,
                error: payload.error,
                message: payload.message
            }
    
        default:
            return state;
    }
}

