import React from "react";
import { Button, AppBar, Toolbar, Typography } from "material-ui";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ auth, dispatch }) => (
  <AppBar position="static" color="primary" style={{ flexGrow: 1 }}>
    <Toolbar color="inherit">
      <Typography variant="title" color="inherit" style={{ flex: 1 }}>
        Social App
      </Typography>
      {auth.loggedIn ? (
        <Button color="inherit">Logout</Button>
      ) : (
        <React.Fragment>
          <Link to="/">
            <Button style={{ color: "white" }}>Login</Button>
          </Link>
          <Link to="/subscribe">
            <Button style={{ color: "white" }}>Cadastro</Button>
          </Link>
        </React.Fragment>
      )}
    </Toolbar>
  </AppBar>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
