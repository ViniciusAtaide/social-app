import React from "react";
import { Button, AppBar, Toolbar, Typography, Grid } from "material-ui";
import { connect } from "react-redux";
import { login, logout } from "../actions";
import { Link } from "react-router-dom";

const Navbar = ({ auth, dispatch }) => (
    <AppBar position="static" color="primary" style={{ flexGrow: 1 }}>
        <Toolbar color="inherit">
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
                Social App
            </Typography>
            {auth.loggedIn ? (
                <Button color="inherit" onClick={() => dispatch(logout())}>
                    Logout
                </Button>
            ) : (
                <React.Fragment>
                    <Button>
                        <Link to="/">Login</Link>
                    </Button>
                    <Button>
                        <Link to="/subscribe">Cadastro</Link>
                    </Button>
                </React.Fragment>
            )}
        </Toolbar>
    </AppBar>
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
