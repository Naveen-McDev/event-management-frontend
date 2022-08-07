// importing types
import types from "../types";

// set error
export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

// remove error
export const removeError = () => ({
  type: types.uiRemoveError,
});

// ui open modal
export const uiOpenModal = () => ({
  type: types.uiOpenModal,
});

// ui close modal
export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});
