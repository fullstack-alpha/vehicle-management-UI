import React from "react";
import jwt_decoder from "jwt-decode";
import Axios from "axios";
import setAuthorizationToken from '../security/setAuthorizationToken';

export const LogoutUser = () => dispatch =>{
  localStorage.removeItem("token");
  setAuthorizationToken(false);
  dispatch({
    type: "SET_USER_SESSION",
    payload:null
  });
}

export const LoginUserAction = credential => async dispatch => {

// admin token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IkFETUlOIn1dfQ.5c7vqljKdhopCMF8XGJ399sdKzTjC863YAnyvt_vTSM

  let response;
  try {
    response = await Axios.post("http://localhost:8080/login", credential);
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    setAuthorizationToken(token);

    dispatch({
      type: "SET_USER_SESSION",
      payload: jwt_decoder(token)
    });
  } catch (error) {
      dispatch({
          type:"ERROR",
          payload: error.response.data
      })
  }
};


