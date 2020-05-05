import React from 'react'
import Axios from 'axios'

function setAuthorizationToken(token) {
    if(token){
        // Axios.defaults.headers.common["Authorization"] = `bearer `;
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    else
    {
        delete Axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthorizationToken
