import axios from 'axios';
import { getUserAccessToken } from "../api/Auth.js"
import BASE_URL from '../api/Constant.js';
import ROUTE from "../api/Route.js";
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const AuthenticationCheckerToLogin = ({children}) => {
    const [auth, setAuth] = useState(undefined)
    isAuthenticate(setAuth);
    if (auth !== undefined) {
        return auth ? children : <Navigate to={ROUTE.LOGIN} replace />
    }
}

const AuthenticationCheckerToDashboard = ({children}) => {
    const [auth, setAuth] = useState(undefined)
    isAuthenticate(setAuth);
    if (auth !== undefined) {
        return auth ? <Navigate to={ROUTE.DASHBOARD} replace /> : children
    }
}

const isAuthenticate = (setAuth) => { 
    let isMasuk
    axios.get(`${BASE_URL}/dummy`, {
        headers: {
            Authorization: `Bearer ${getUserAccessToken()}`
        },
    }).catch((error) => {
        isMasuk = true
        if (error.response) {
            const traceError = error['response']['data']['trace']
            const invalidUserAccessToken = traceError.includes('com.auth0.jwt.exceptions.JWTDecodeException')
            const tokenExpiredException = traceError.includes('com.auth0.jwt.exceptions.TokenExpiredException')
            if (invalidUserAccessToken || tokenExpiredException) {
                isMasuk = false
            }
        }
        setAuth(isMasuk)
    })
    return isMasuk
}

export {AuthenticationCheckerToLogin, AuthenticationCheckerToDashboard, isAuthenticate}