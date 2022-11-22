import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { deleteUserAccessToken, deleteUserRefreshToken, getUserAccessToken } from "../api/Auth";
import ROUTE from "../api/Route"

// Axios Intercept 401 / 403 Unauthorized
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const navigate = useNavigate();
    const unauthorized = (401 === error.response.status || 403 === error.response.status) && getUserAccessToken() !== null
    const tokenExpiredException = error.response['data']['trace'].includes('com.auth0.jwt.exceptions.TokenExpiredException')
    
    if (unauthorized || tokenExpiredException) {
        deleteUserAccessToken();
        deleteUserRefreshToken();
    
        navigate(ROUTE.LOGIN);
    }
    return Promise.reject(error);
});
