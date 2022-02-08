import React, {useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    return isAuthenticated ? (<Outlet setAuth = {setAuth}/> ): <Navigate to="/login" />; //if user is authenticated -> forward to target page. If user is not authenticated -> redirect to login
}
export default PrivateRoute;