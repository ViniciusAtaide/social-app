import React from "react";
import validator from "email-validator";
import { signin } from "../actions";
import { Form, Field } from "react-final-form";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

const validate = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "Obrigatório";
  }
  if (values.password !== values.repeat) {
    errors.password = "Senhas não estão iguais.";
  }
  if (!validator.validate(values.email)) {
    errors.email = "Email inválido.";
  }
  return errors;
};

const Subscribe = ({ classes, dispatch, signinError, toggleSubscribe }) => (
  <Form
    onSubmit={values => dispatch(signin(values))}
    validate={validate}
    render={({ handleSubmit, form, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Paper elevation={5} className={classes.paperForm}>
            <Grid item className={classes.header}>
              <Typography variant="title">Cadastro</Typography>
            </Grid>
            <Grid item className={classes.input}>
              <Field name="name">
                {({ input, meta }) => (
                  <TextField
                    helperText={meta.touched && meta.error}
                    error={meta.touched && meta.error ? true : false}
                    placeholder="Nome"
                    fullWidth={true}
                    {...input}
                  />
                )}
              </Field>
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
            <Grid item className={classes.input}>
              <Field name="repeat">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    helperText={meta.touched && meta.error}
                    error={meta.touched && meta.error ? true : false}
                    type="password"
                    fullWidth={true}
                    placeholder="Repita a senha"
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field name="bio">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    fullWidth={true}
                    placeholder="Biografia"
                    rows={4}
                    rowsMax={8}
                    multiline={true}
                  />
                )}
              </Field>
            </Grid>

            {signinError ? (
              <p style={{ color: "red" }}> {signinError} </p>
            ) : null}

            <Grid item container justify="flex-end">
              <Button
                color="primary"
                className={classes.bottom}
                onClick={toggleSubscribe}
              >
                Login
              </Button>

              <Button
                className={classes.bottom}
                onClick={form.reset}
                disabled={pristine}
              >
                Resetar
              </Button>
              <Button
                onClick={handleSubmit}
                className={classes.bottom}
                disabled={submitting || pristine}
                color="secondary"
                variant="raised"
              >
                Cadastrar
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    )}
  />
);

export default Subscribe;
