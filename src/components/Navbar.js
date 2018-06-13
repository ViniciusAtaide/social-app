import React from "react";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const logout = () => ({ type: "LOGOUT" });

const styles = theme => ({
  bar: { flexGrow: 1 },
  title: { flex: 1 },
  nav: { textDecoration: "none", color: "white" },
  navBtn: { color: "white" }
});

const Navbar = ({ auth, dispatch, classes }) => (
  <AppBar position="static" color="primary" className={classes.bar}>
    <Toolbar color="inherit">
      <Typography variant="title" color="inherit" className={classes.title}>
        <Link className={classes.nav} to="/">
          Social App
        </Link>
      </Typography>
      {auth.user ? (
        <Button color="inherit" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      ) : (
        <React.Fragment>
          <Link to="/login" className={classes.nav}>
            <Button className={classes.navBtn}>Login</Button>
          </Link>
        </React.Fragment>
      )}
    </Toolbar>
  </AppBar>
);

const mapStateToProps = state => ({
  auth: state.context
});

export default withStyles(styles)(connect(mapStateToProps)(Navbar));
