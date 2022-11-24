import axios from 'axios';
import { getUserAccessToken, getTokenExpiration } from "../api/Auth.js"
import BASE_URL from '../api/Constant.js';
import ROUTE from "../api/Route.js";
import { Navigate } from 'react-router-dom';



const AuthenticationChecker = ({children}) => {
    console.log(isAuthenticate());
    console.log("EXP" + getTokenExpiration());
    // return isAuthenticate() ? children : <Navigate to={ROUTE.LOGIN} replace />
    return children;
}

const isAuthenticate = () => {
    return isAuthenticateValidLocal() && getUserAccessToken() != null;
    // return isAuthenticateValid().then((data) => {
    //     return getUserAccessToken() != null && data
    // })
}

const isAuthenticateValidLocal = () => {
    if (Date.now() < getTokenExpiration()) {
        return true;
    } 
    return false;
}

const isAuthenticateValid = () => { 
    let isMasuk = true
    axios.get(`${BASE_URL}/v1/kamar`, {
        headers: {
            Authorization: `Bearer ${getUserAccessToken()}`
        }
    }).catch((error) => {
    
        if (error.response['data']['trace'].includes('com.auth0.jwt.exceptions.TokenExpiredException')) {
            isMasuk = false
        }
    })
    return isMasuk
  }

export {AuthenticationChecker, isAuthenticate, isAuthenticateValid}