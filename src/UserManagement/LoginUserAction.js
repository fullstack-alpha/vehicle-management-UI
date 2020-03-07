import React from "react";
import jwt_decoder from "jwt-decode";
import Axios from "axios";

export const LoginUserAction = credential => async dispatch => {
  console.log("called");
  let response;
  try {
    response = await Axios.post("http://localhost:8080/login", credential);
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    dispatch({
      type: "SET_USER_SESSION",
      payload: jwt_decoder(token)
    });
  } catch (error) {
      dispatch({
          type:"ERROR",
          payload: error.response.data
      })
      dispatch({
        type:"SET_USER_SESSION"
    })
  }
};
