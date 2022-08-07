import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

// private route
const PrivateRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export default PrivateRoute;
