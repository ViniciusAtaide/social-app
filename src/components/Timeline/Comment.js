import React from "react";
import Typography from "@material-ui/core/Typography";
import { api } from "../../index";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
  exclude: { float: "right" },
  paragraph: { minHeight: 50 }
};

const excludeComment = (post, i, id, token) => dispatch => {
  dispatch({ type: "REQUEST_SENT", message: "Removendo Comentário" });
  api
    .delete(`comments/${id}`, { headers: { authorization: token } })
    .then(() => {
      dispatch({ type: "REQUEST_RECEIVED" });
      dispatch({ type: "COMMENT_EXCLUDED", payload: { post, i } });
    })
    .catch(err => dispatch({ type: "REQUEST_RECEIVED" }));
};

const Comment = ({ comment, classes, dispatch, token, i, post }) => (
  <Typography paragraph className={classes.paragraph}>
    {comment.content}
    <IconButton
      className={classes.exclude}
      onClick={e => dispatch(excludeComment(post.id, i, comment.id, token))}
    >
      <Icon>block</Icon>
    </IconButton>
  </Typography>
);

export default connect(store => ({
  token: store.context.user.auth_token
}))(withStyles(styles)(Comment));
