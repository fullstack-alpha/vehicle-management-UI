import React from 'react'
import axios from 'axios'

function setAuthorizationToken(token) {
    if(token){
        // Axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        // axios.defaults.headers.common['Authentication'] = `Bearer ${ token }`
    }
    else
    {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthorizationToken
