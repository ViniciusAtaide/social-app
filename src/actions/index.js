import { api } from "../index";
import { push } from "react-router-redux";

// Auth

export const signin = user => dispatch => {
  const { name, email, bio, password } = user;

  dispatch({
    type: "REQUEST_SENT"
  });

  api
    .post("users", {
      name,
      email,
      bio,
      password
    })
    .then(response => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({ type: "LOGIN", user: response.data });
      dispatch(push("/"));
    })
    .catch(error => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({ type: "SIGNIN_ERROR", payload: error.response.data.message });
    });
};

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: "REQUEST_SENT" });

  api
    .post("authenticate", {
      email,
      password
    })
    .then(response => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({ type: "LOGIN", user: response.data });
      dispatch(push("/"));
    })
    .catch(error => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.error.user_authentication[0]
      });
    });
};

export const logout = () => ({ type: "LOGOUT" });
