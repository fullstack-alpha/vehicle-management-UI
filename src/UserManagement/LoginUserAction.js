import React from 'react'
import jwt_decoder from 'jwt-decode'
import Axios from 'axios'

export const LoginUserAction= () => {

return function(dispatch){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    localStorage.setItem("token",token);
    console.log(jwt_decoder(token))
    dispatch({
        type: "SET_USER_SESSION",
        payload: jwt_decoder(token)
    })
}
}
