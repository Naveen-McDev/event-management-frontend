import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AuthRouter from "./AuthRouter";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../actions/auth";
import LoadingScreen from "../components/ui/LoadingScreen";

// app router
const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

// show loading screen while checking
  if (checking){
    return <LoadingScreen />
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoute isAuth={!!id}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!id}>
              <CalendarScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default AppRouter;
