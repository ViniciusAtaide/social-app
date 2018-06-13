import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { connect } from "react-redux";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Collapse from "@material-ui/core/Collapse";
import { api } from "../..";

const styles = theme => ({
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  ib: {
    float: "right"
  },
  input: {
    width: theme.spacing.unit * 45,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  posts: {
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 50,
    padding: theme.spacing.unit * 2,
    position: "relative"
  },
  exclude: {
    position: "absolute",
    right: theme.spacing.unit * 2,
    top: theme.spacing.unit * 2
  }
});

class Post extends Component {
  state = { expanded: false, newComment: false };

  expandComment = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  toggleNewComment = () => {
    this.setState({ newComment: !this.state.newComment });
  };

  excludePost = (i, id, token) => dispatch => {
    dispatch({ type: "REQUEST_SENT", message: "Removendo Post" });
    api
      .delete(`posts/${id}`, { headers: { authorization: token } })
      .then(() => {
        dispatch({ type: "REQUEST_RECEIVED" });
        dispatch({ type: "POST_EXCLUDED", payload: i });
      })
      .catch(err => dispatch({ type: "REQUEST_RECEIVED" }));
  };

  render() {
    const { expanded, newComment } = this.state;
    const { classes, post, dispatch, i, token } = this.props;

    return (
      <Card className={classes.posts}>
        <CardContent>
          <Typography variant="subheading" component="h2" color="textSecondary">
            {post.user.name}
          </Typography>
          <Typography variant="body1">{post.content}</Typography>
          <IconButton
            className={classes.exclude}
            onClick={() => dispatch(this.excludePost(i, post.id, token))}
          >
            <Icon>block</Icon>
          </IconButton>
        </CardContent>
        <CardActions justify="flex-end">
          <Typography variant="headline">Comentários</Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.expandComment}
            aria-expanded={expanded}
            aria-label="Comentários"
          >
            <Icon>expand_more</Icon>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {post.comments.length > 0 ? (
              post.comments.map((comment, i) => (
                <Comment comment={comment} key={comment.id} i={i} post={post} />
              ))
            ) : (
              <Typography paragraph>Nenhum Comentário</Typography>
            )}
            {newComment ? (
              <AddComment
                post={post}
                toggleNewComment={this.toggleNewComment}
              />
            ) : (
              <IconButton
                onClick={this.toggleNewComment}
                className={classes.ib}
              >
                <Icon>add</Icon>
              </IconButton>
            )}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({ token: state.context.user.auth_token }))(Post)
);
