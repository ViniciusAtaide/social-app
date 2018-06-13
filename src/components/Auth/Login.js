import React from "react";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import validator from "email-validator";
import { api } from "../../";
import { push } from "react-router-redux";

const validate = values => {
  let errors = {};
  if (!validator.validate(values.email)) {
    errors.email = "Email inválido.";
  }
  return errors;
};

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: "REQUEST_SENT", message: "Logando..." });

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
      if (error.response.status === 404) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: "Sistema Offline"
        });
      } else {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error.response.data.error.user_authentication[0]
        });
      }
    });
};

const Login = ({ classes, toggleSubscribe, loginError, dispatch }) => (
  <Form
    validate={validate}
    onSubmit={values => dispatch(login(values))}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Paper elevation={5} className={classes.paperForm}>
            <Grid item className={classes.header}>
              <Typography variant="title">Login</Typography>
            </Grid>
            <Grid item className={classes.input}>
              <Field name="email">
                {({ input, meta }) => (
                  <TextField
                    helperText={meta.touched && meta.error}
                    error={meta.touched && meta.error ? true : false}
                    placeholder="Email"
                    fullWidth={true}
                    {...input}
                  />
                )}
              </Field>
            </Grid>
            <Grid item className={classes.input}>
              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    helperText={meta.touched && meta.error}
                    error={meta.touched && meta.error ? true : false}
                    required={true}
                    fullWidth={true}
                    type="password"
                    placeholder="Senha"
                  />
                )}
              </Field>
            </Grid>
            {loginError ? (
              <Typography style={{ color: "red" }}> {loginError} </Typography>
            ) : null}
            <Grid item container justify="flex-end">
              <Button color="secondary" onClick={toggleSubscribe}>
                Cadastro
              </Button>
              <Button color="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    )}
  />
);

export default Login;
