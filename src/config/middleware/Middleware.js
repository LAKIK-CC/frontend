import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserAccessToken } from "../api/Auth.js"
import BASE_URL from '../api/Constant.js';
import ROUTE from "../api/Route.js"

const AuthenticationChecker = ({children}) => {
    const navigate = useNavigate();
    return isAuthenticate() ? children : navigate(ROUTE.LOGIN)
}

function isAuthenticate() {
    return (getUserAccessToken() != null) && isAuthenticateValid()
}

function isAuthenticateValid() { 
    axios.get(`${BASE_URL}/v1/kamar/`, {
        headers: {
            Authorization: `Bearer ${getUserAccessToken()}`
        }
    }).catch((error) => {
        if (error.response['data']['trace'].includes('com.auth0.jwt.exceptions.TokenExpiredException')) {
            return false
        }
    })
    return true
  }

export {AuthenticationChecker, isAuthenticate, isAuthenticateValid}