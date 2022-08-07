import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import types from "../types";

// event start loading
export const eventStartLoading = () => {
  return async (dispatch) => {
    // api
    fetchWithToken("api/events")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // prepare event
          const events = prepareEvents(data.events);
          // event loaded
          dispatch(eventLoaded(events));
        } else {
          // response if error
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

// event start add new
export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    // destructure
    const { id: _id, name } = getState().auth;
    // api
    fetchWithToken("api/events", event, "POST")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          event.id = data.event._id;
          event.user = {
            _id,
            name,
          };
          // event add new
          dispatch(eventAddNew(event));
          Swal.fire(
            "Saved",
            `'${event.title}' has been saved successfully.`,
            "success"
          );
        } else {
          // response if error
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

// event start update
export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    // api
    fetchWithToken(`api/events/${event.id}`, event, "PUT")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // event update
          dispatch(eventUpdate(event));
          Swal.fire(
            "Updated",
            `'${event.title}' has been updated successfully.`,
            "success"
          );
        } else {
          // response if error
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

// event start delete
export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    // destructure
    const { id } = getState().calendar.activeEvent;
    // api
    fetchWithToken(`api/events/${id}`, {}, "DELETE")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          // event delete
          dispatch(eventDelete(id));
          Swal.fire(
            "Deleted",
            `The event has been deleted successfully.`,
            "success"
          );
        } else {
          // response if error
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        // response if error
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

// event loaded
const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

// event set active
export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

// event clear active
export const eventClearActive = () => ({
  type: types.eventClearActive,
});

// event add new
const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

// event update
const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

// event delete
const eventDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});

// event logout
export const eventLogout = () => ({
  type: types.eventClearLogout,
});
