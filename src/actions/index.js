import { instance } from "../index";

// Auth

export const login = user => dispatch => {
  const { name, email, bio, password } = user;
  dispatch({
    type: "REQUEST_SENT"
  });
  instance
    .post("users", {
      name,
      email,
      bio,
      password
    })
    .then(response => {
      dispatch({ type: "REQUEST_RECEIVED" });
    })
    .catch(error => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    });
};
export const logout = () => ({ type: "LOGOUT" });
