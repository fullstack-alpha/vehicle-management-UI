import React from 'react'

export default function ParkingSlotReducer(state = [], action) {
    switch (action.type) {
        case "SET_ALL_PARKING_SLOTS":
            return {
                ...state,
                parkingSlots: action.payload
            }
        default:
            return state;
    }


}
