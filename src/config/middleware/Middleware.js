import axios from 'axios';
import { getUserAccessToken } from "../api/Auth.js"
import BASE_URL from '../api/Constant.js';
import ROUTE from "../api/Route.js";
import { Navigate } from 'react-router-dom';



const AuthenticationChecker = ({children}) => {
    console.log(isAuthenticate());
    return isAuthenticate() ? children : <Navigate to={ROUTE.LOGIN} replace />
}

const isAuthenticate = () => {
    return isAuthenticateValid().then((data) => {
        return getUserAccessToken() != null && data
    })
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