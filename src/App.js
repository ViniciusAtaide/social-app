import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Timeline, Subscribe } from "./routes";
import SnackBar from "material-ui/Snackbar";
import { connect } from "react-redux";

const App = ({ request }) => (
  <Router>
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Timeline} />
        <Route path="/subscribe" component={Subscribe} />
      </Switch>
      <SnackBar open={request.loading} message="Enviando Requisição." />
    </React.Fragment>
  </Router>
);

export default connect(state => ({ request: state.request }))(App);
