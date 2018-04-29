import React from "react";
import { Form, Field } from "react-final-form";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { login } from "../actions";
import validator from "email-validator";

const validate = values => {
  let errors = {};
  if (!validator.validate(values.email)) {
    errors.email = "Email inválido.";
  }
  return errors;
};

const Login = ({ classes, toggleSubscribe, loginError, dispatch }) => (
  <Form
    validate={validate}
    onSubmit={values => dispatch(login(values))}
    render={({ handleSubmit, form, submitting, pristine }) => (
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
