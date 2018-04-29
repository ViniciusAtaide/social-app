import React from "react";
import { Navbar } from "./components";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Timeline, Auth } from "./routes";
import SnackBar from "material-ui/Snackbar";
import { connect } from "react-redux";

const PrivateRoute = connect(store => ({ user: store.auth.user }))(
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
    <SnackBar open={request.loading} message="Enviando Requisição." />
  </React.Fragment>
);

export default withRouter(connect(state => ({ request: state.request }))(App));
