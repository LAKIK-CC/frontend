import axios from 'axios';
import { getUserAccessToken } from "../api/Auth.js";
import ROUTE from "../api/Route.js";
import { Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const AuthenticationCheckerToLogin = ({children}) => {
    if(getUserAccessToken() === null) {
        return <Navigate to={ROUTE.LOGIN} replace />
    }
    return children
}

const AuthenticationCheckerToDashboard = ({children}) => {
    if(getUserAccessToken() !== null) {
        return <Navigate to={ROUTE.DASHBOARD} replace />
    }
    return children
}

const history = createBrowserHistory();

export {AuthenticationCheckerToLogin, AuthenticationCheckerToDashboard, history}