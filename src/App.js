import React from "react";
import { Navbar } from "./components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Timeline, Auth } from "./routes";
import SnackBar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";

const PrivateRoute = connect(store => ({ user: store.context.user }))(
  ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
);

const App = ({ request }) => (
  <React.Fragment>
    <Navbar />
    <Switch>
      <PrivateRoute exact path="/" component={Timeline} />
      <Route path="/login" component={Auth} />
    </Switch>
    <SnackBar open={request.loading} message={request.message} />
  </React.Fragment>
);

const initialState = {
  user: null,
  loginError: null,
  signinError: null,
  loading: false,
  message: ""
};

export const context = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    case "RESET":
      return initialState;
    case "SIGNIN_ERROR":
      return { ...state, signinError: action.payload };
    case "LOGIN_ERROR":
      return { ...state, loginError: action.payload };
    case "REQUEST_SENT":
      return { ...state, loading: true, message: action.payload };
    case "REQUEST_RECEIVED":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default withRouter(connect(state => ({ request: state.context }))(App));
