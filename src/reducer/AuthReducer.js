import React from 'react'

const initialState ={
    validToken: false,
    user:{}
}

export default function AuthReducer(state=initialState, action) {
        switch (action.type) {
            case "SET_USER_SESSION":
                return{
                    ...state,
                    validToken: true,
                    user:action.payload
                }
            default:
                return state
        }
}

