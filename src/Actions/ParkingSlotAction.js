import React from 'react';
import Axios from "axios";

export const GetAllParkingSlots = () => async dispatch => {
    let response;
  try {
    // response = await Axios.get("http://localhost:8080/common/parkingSlots");
    let response = await fetch(`http://localhost:8080/common/parkingSlots`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }});
    const json = await response.json();
    dispatch({
      type: "SET_ALL_PARKING_SLOTS",
      payload: json
    });
  } catch (error) {
      dispatch({
          type:"ERROR",
          payload: !error.response ? error : error.response.data
      })
      return false;
  }

  return true;
}
