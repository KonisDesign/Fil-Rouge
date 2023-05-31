import { Navigate, useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');
    let user = null;

    // Check if token exists and is valid
    try {
        if (token) {
            user = jwtDecode(token);
        }
    } catch (error) {
        localStorage.removeItem('token');
    }

    if (!user) {
        // If user not logged in, redirect to /login
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
