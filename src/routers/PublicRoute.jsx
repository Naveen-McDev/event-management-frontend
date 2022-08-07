import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// public route
const PublicRoute = ({ isAuth, children }) => {
  return isAuth ? <Navigate to="/" /> : children;
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export default PublicRoute;
