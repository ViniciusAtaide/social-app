import React from "react";
import { Form, Field } from "react-final-form";
import "./Subscribe.css";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

const onSubmit = () => {};

const validate = values => {
  let errors = {};
  console.log(values);
  if (!values.name) {
    errors.name = "Obrigatório";
  }
  return errors;
};

const renderInput = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField fullWidth={true} {...input} {...custom} />
);

const Subscribe = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, reset, submitting, pristine }) => (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Paper
            elevation={5}
            style={{ flex: 0.33, marginTop: 50, padding: 20 }}
          >
            <Grid item style={{ height: 50 }}>
              <Typography variant="title" style={{ flex: 0.33 }}>
                Cadastro
              </Typography>
            </Grid>
            <Grid item style={{ height: 40 }}>
              <Field
                name="name"
                placeholder="Nome"
                errortext={"oloko meu"}
                required={true}
                render={renderInput}
              />
            </Grid>
            <Grid item style={{ height: 40 }}>
              <Field
                name="password"
                required={true}
                fullWidth={true}
                type="password"
                placeholder="Senha"
                component={TextField}
              />
            </Grid>
            <Grid item style={{ height: 40 }}>
              <Field
                name="repeat"
                type="password"
                required={true}
                fullWidth={true}
                placeholder="Repita a senha"
                component={TextField}
              />
            </Grid>
            <Grid item>
              <Field
                name="bio"
                fullWidth={true}
                placeholder="Biografia"
                component={TextField}
                multiline={true}
                rows={2}
                rowsMax={4}
              />
            </Grid>
          </Paper>
        </Grid>
      </form>
    )}
  />
);

export default Subscribe;
