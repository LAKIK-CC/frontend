import axios from "axios";
import { getUserAccessToken, deleteUserAccessToken, deleteUserRefreshToken } from "../api/Auth";
import ROUTE from "../api/Route"

// axios.interceptors.request.use(
//     async config => {
//       config.headers = { 
//         'Authorization': `Bearer ${getUserAccessToken()}`,
//         'Accept': 'application/json',
//       }
//       return config;
//     },
//     error => {
//       Promise.reject(error)
//   });

axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const unauthorized = 403 === error.response.status
    const tokenExpiredException = error.response['data']['trace'].includes('com.auth0.jwt.exceptions.TokenExpiredException')
    const jtwDecodeException = error.response['data']['trace'].includes('com.auth0.jwt.exceptions.JWTDecodeException')
    if (unauthorized || tokenExpiredException || jtwDecodeException) {
        deleteUserAccessToken()
        deleteUserRefreshToken()
        window.location.reload(false); //reload with getting from cache
        
        // history.replace(ROUTE.LOGIN)
    }
    return Promise.reject(error);
});