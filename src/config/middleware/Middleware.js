import { useNavigate } from 'react-router-dom';
import { getUserToken } from "../api/Auth.js"
import ROUTE from "../api/Route.js"

const AuthenticationChecker = ({children}) => {
    const navigate = useNavigate();
    return isAuthenticate() ? children : navigate(ROUTE.LOGIN)
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}