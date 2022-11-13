import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { deleteUserToken, getUserToken } from "../api/Auth";
import ROUTE from "../api/Route"

// Axios Intercept 401 / 403 Unauthorized
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if ((401 === error.response.status || 403 === error.response.status) && getUserToken() !== null) {
        deleteUserToken();
        
        const navigate = useNavigate();
        navigate(ROUTE.LOGIN);
    }
    return Promise.reject(error);
});
