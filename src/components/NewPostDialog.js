import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { togglePostDialog } from "../actions/timeline";
import { Form, Field } from "react-final-form";
import { createPost } from "../actions/timeline";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { TextField } from "material-ui";

const styles = theme => ({
  input: {
    width: theme.spacing.unit * 50
  }
});

const NewPostDialog = ({ open, dispatch, classes, token }) => (
  <Dialog
    open={open}
    onClose={() => dispatch(togglePostDialog())}
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
            <Button
              onClick={() => dispatch(togglePostDialog())}
              color="secondary"
            >
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

export default withStyles(styles)(NewPostDialog);
