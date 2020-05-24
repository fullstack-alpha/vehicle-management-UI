import React from 'react'
import Axios from "axios";
const GetEmployeeDetails = () => async dispatch => {

    try {
      let response = await Axios.get("http://localhost:8080/common/employee");
      // let response = await fetch(`http://localhost:8080/common/employee`);
      // const json = await response.json();
      // console.log("axios emp -- "+ json)
      dispatch({
        type: "SET_EMP_DETAILS",
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  
  }

  export default GetEmployeeDetails;
