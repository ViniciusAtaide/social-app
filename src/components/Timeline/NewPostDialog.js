import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Field } from "react-final-form";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { api } from "../../index";
import { connect } from "react-redux";

const styles = theme => ({
  input: {
    width: theme.spacing.unit * 50
  }
});

const createPost = (post, token) => dispatch => {
  api
    .post("posts", post, { headers: { authorization: token } })
    .then(response => {
      dispatch({ type: "TOGGLE_POST_DIALOG" });
      dispatch({ type: "POST_CREATED", post: response.data });
    })
    .catch(err => {
      dispatch({ type: "TOGGLE_POST_DIALOG" });
    });
};

const NewPostDialog = ({
  open,
  dispatch,
  classes,
  togglePostDialog,
  token
}) => (
  <Dialog
    open={open}
    onClose={togglePostDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <Form
      onSubmit={values => dispatch(createPost(values, token))}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-title">Criar novo Post</DialogTitle>
          <DialogContent>
            <Grid container className={classes.input} justify="center">
              <Grid item>
                <Field name="content">
                  {({ input, email }) => (
                    <TextField
                      {...input}
                      placeholder="Conteúdo"
                      className={classes.input}
                      fullWidth={true}
                      multiline={true}
                      rows={4}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={togglePostDialog} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              type="submit"
              autoFocus
            >
              Criar
            </Button>
          </DialogActions>
        </form>
      )}
    />
  </Dialog>
);

export default connect(store => ({ token: store.context.user.auth_token }))(
  withStyles(styles)(NewPostDialog)
);
