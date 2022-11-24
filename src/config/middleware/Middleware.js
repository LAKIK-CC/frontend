import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserAccessToken } from "../api/Auth.js"
import BASE_URL from '../api/Constant.js';
import ROUTE from "../api/Route.js";
import { Navigate } from 'react-router-dom';

const AuthenticationChecker = ({children}) => {
    console.log(isAuthenticate());
    return isAuthenticate() ? children : <Navigate to={ROUTE.LOGIN} replace />
}

<<<<<<< HEAD
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
=======
const isAuthenticate = async () => { 
    let isMasuk = true
    try {
        await axios.get(`${BASE_URL}/dummy`, {
            headers: {
                Authorization: `Bearer ${getUserAccessToken()}`
            }
        })
    } catch(error) {
        if (error.status === 500) {
            const traceError = error.response['data']['trace']
            const invalidUserAccessToken = traceError.includes('com.auth0.jwt.exceptions.JWTDecodeException')
            const tokenExpiredException = traceError.includes('com.auth0.jwt.exceptions.TokenExpiredException')
            if (invalidUserAccessToken || tokenExpiredException) {
                isMasuk = false
            }
>>>>>>> 6072b6073ba27221a1598c59c9e8bb609417a533
        }
    }
    return isMasuk
  }

export {AuthenticationChecker, isAuthenticate}