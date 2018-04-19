import React from "react";
import { Button, AppBar, Toolbar, Typography } from "material-ui";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const styles = theme => ({
  bar: { flexGrow: 1 },
  title: { flex: 1 },
  nav: { textDecoration: "none" },
  navBtn: { color: "white" }
});

const Navbar = ({ auth, dispatch, classes }) => (
  <AppBar position="static" color="primary" className={classes.bar}>
    <Toolbar color="inherit">
      <Typography variant="title" color="inherit" className={classes.title}>
        Social App
      </Typography>
      {auth.loggedIn ? (
        <Button color="inherit">Logout</Button>
      ) : (
          <React.Fragment>
            <Link to="/" className={classes.nav}>
              <Button className={classes.navBtn}>Login</Button>
            </Link>
            <Link to="/subscribe" className={classes.nav}>
              <Button className={classes.navBtn}>Cadastro</Button>
            </Link>
          </React.Fragment>
        )}
    </Toolbar>
  </AppBar>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
