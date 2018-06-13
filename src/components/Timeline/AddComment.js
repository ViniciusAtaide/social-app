import { api } from "../../";
import React from "react";
import { Form, Field } from "react-final-form";
import { Grid, TextField, Button, withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const createComment = (comment, post, token, toggleNewComment) => dispatch => {
  dispatch({ type: "REQUEST_SENT", message: "Criando Comentário" });
  api
    .post(`users/${post.user.id}/posts/${post.id}/comments`, comment, {
      headers: { authorization: token }
    })
    .then(response => {
      dispatch({
        type: "COMMENT_CREATED",
        payload: { comment: response.data, post: post.id }
      });
      dispatch({ type: "REQUEST_RECEIVED" });
      toggleNewComment();
    })
    .catch(err => dispatch({ type: "REQUEST_RECEIVED" }));
};

const styles = theme => ({
  input: {
    width: theme.spacing.unit * 50
  }
});

const AddComment = ({ post, dispatch, token, toggleNewComment, classes }) => (
  <Form
    onSubmit={values =>
      dispatch(createComment(values, post, token, toggleNewComment))
    }
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item>
            <Field name="content">
              {({ input }) => (
                <TextField
                  {...input}
                  placeholder="Comentário"
                  className={classes.input}
                  fullWidth={true}
                  multiline={true}
                  rows={2}
                />
              )}
            </Field>
          </Grid>
          <Grid item>
            <Button onClick={toggleNewComment}>Cancelar</Button>
          </Grid>
          <Grid item>
            <Button variant="raised" color="primary" type="submit">
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </form>
    )}
  />
);

export default connect(store => ({
  token: store.context.user.auth_token
}))(withStyles(styles)(AddComment));
