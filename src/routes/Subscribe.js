import React from "react";
import { Form, Field } from "react-final-form";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { login } from "../actions";
import validator from "email-validator";

const styles = theme => ({
  paperForm: {
    flex: 0.33,
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 3
  },
  header: {
    height: theme.spacing.unit * 5
  },
  input: {
    height: theme.spacing.unit * 7
  },
  bottom: {
    marginTop: 20
  }
});

const onSubmit = (dispatch, values) => {
  dispatch(login(values));
};

const validate = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "Obrigatório";
  }
  if (values.password !== values.repeat) {
    errors.password = "Senhas não estão iguais.";
  }
  if (!validator.validate(values.email)) {
    errors.email = "Não é um email válido";
  }
  return errors;
};

const Subscribe = ({ classes, dispatch }) => (
  <Form
    onSubmit={onSubmit.bind(this, dispatch)}
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
                  <div>
                    <TextField
                      helperText={meta.touched && meta.error}
                      error={meta.touched && meta.error ? true : false}
                      placeholder="Nome"
                      fullWidth={true}
                      {...input}
                    />
                  </div>
                )}
              </Field>
            </Grid>
            <Grid item className={classes.input}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <TextField
                      helperText={meta.touched && meta.error}
                      error={meta.touched && meta.error ? true : false}
                      placeholder="Email"
                      fullWidth={true}
                      {...input}
                    />
                  </div>
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

            <Grid item container justify="flex-end">
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

export default connect()(withStyles(styles)(Subscribe));
