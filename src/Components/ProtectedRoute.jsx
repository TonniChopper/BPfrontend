import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../constants';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const location = useLocation();

    if (!token) {
        // Redirect to login, saving the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

