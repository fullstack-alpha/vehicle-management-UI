import React from 'react'

let employeeDetails = {};

export default function EmployeeReducer(state=employeeDetails, action) {
    switch (action.type) {
        case "SET_EMP_DETAILS":
            return{
                ...state,
                employee: action.payload
            }    
        default:
            return state;
    }
}
