import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import types from "../types";
import Swal from "sweetalert2";
import { removeError, setError } from "./ui";
import { eventLogout } from "./event";

// start login
export const startLogin = (email, password) => {
  return async (dispatch) => {
    // api
    fetchNoToken("api/auth/login", { email, password }, "POST")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // destructuring the data
          const { user, token } = data;
          const { _id: id, name } = user;

          // storing in local storage for authorization
          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        } else {
          // response if error
          if (data.errors) dispatch(checkingErrors(data.errors));
          if (data.msg) Swal.fire("Error", data.msg, "error");
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

// start register
export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    // api
    fetchNoToken("api/auth/register", { name, email, password }, "POST")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // destructure the data
          const { user, token } = data;
          const { _id: id, name } = user;

          // storing in local storage for authorization
          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        } else {
          // response if error
          if (data.errors) dispatch(checkingErrors(data.errors));
          if (data.msg) Swal.fire("Error", data.msg, "error");
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

// checking errors
export const checkingErrors = (errors) => {
  return (dispatch) => {
    const { msg } = errors[Object.keys(errors)[0]];
    dispatch(setError(msg));
  };
};

// start checking
export const startChecking = () => {
  return async (dispatch) => {
    // api
    fetchWithToken("api/auth/renew")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // destructure the data
          const { user, token } = data;
          const { _id: id, name } = user;

          // storing in local storage for authorization
          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      })
      .finally(() => {
        dispatch(checkingFinish());
      });
  };
};

// checking finish
const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

// login
const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

// start logout
export const startLogout = () => {
  return (dispatch) => {
    // clearing local storage
    localStorage.clear();
    dispatch(removeError());
    dispatch(eventLogout());
    dispatch(logout());
  };
};

// logout
export const logout = () => ({
  type: types.authLogout,
});
