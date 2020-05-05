import React from 'react'
import Axios from "axios";
export const GetEmployeeDetails = () => async dispatch => {

    let response;
    try {
      response = await Axios.get("http://localhost:8080/common/employee");
      console.log(response);
      dispatch({
        type: "SET_EMP_DETAILS",
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  
  }
