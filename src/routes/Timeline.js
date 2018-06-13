import React from "react";
import { api } from "../index";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { NewPostDialog, Post } from "../components";

export const togglePostDialog = () => ({ type: "TOGGLE_POST_DIALOG" });

const requestPosts = token => dispatch => {
  api
    .get("posts", { headers: { authorization: token } })
    .then(response => {
      dispatch({ type: "POSTS_RECEIVED", payload: response.data });
    })
    .catch(error => {
      dispatch({ type: "RESET" });
    });
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  posts: {
    margin: 20,
    width: 400,
    padding: 20
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class TimelineWrapper extends React.Component {
  componentDidMount() {
    const { token, dispatch } = this.props;
    dispatch(requestPosts(token));
  }

  render() {
    return <Timeline {...this.props} />;
  }
}

const Timeline = ({ timeline, classes, dispatch }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          {timeline.posts.length > 0 ? (
            timeline.posts.map((post, i) => <Post post={post} key={i} i={i} />)
          ) : (
            <Paper className={classes.posts}>
              <Typography variant="title">Nenhum post ainda</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Grid>
    <Button
      variant="fab"
      color="primary"
      aria-label="add"
      className={classes.button}
      onClick={() => dispatch(togglePostDialog())}
    >
      <Icon>add</Icon>
    </Button>
    {timeline.postDialog ? (
      <NewPostDialog
        open={timeline.postDialog}
        togglePostDialog={() => dispatch(togglePostDialog())}
      />
    ) : null}
  </Grid>
);

const initialState = {
  posts: [],
  postDialog: false
};

export function timeline(state = initialState, action) {
  let posts, post;
  switch (action.type) {
    case "POSTS_RECEIVED":
      return { ...state, posts: action.payload };
    case "TOGGLE_POST_DIALOG":
      return { ...state, postDialog: !state.postDialog };
    case "POST_CREATED":
      return { ...state, posts: [action.post, ...state.posts] };
    case "COMMENT_CREATED":
      posts = [...state.posts];
      post = posts.find(post => post.id === action.payload.post);
      post.comments = [...post.comments, action.payload.comment];
      return { ...state, posts };
    case "POST_EXCLUDED":
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, action.payload),
          ...state.posts.slice(action.payload + 1)
        ]
      };
    case "COMMENT_EXCLUDED":
      posts = [...state.posts];
      post = posts.find(post => post.id === action.payload.post);
      post.comments = [
        ...post.comments.slice(0, action.payload.i),
        ...post.comments.slice(action.payload.i + 1)
      ];
      return {
        ...state,
        posts
      };
    default:
      return state;
  }
}

export default withStyles(styles)(
  connect(store => ({
    token: store.context.user.auth_token,
    timeline: store.timeline
  }))(TimelineWrapper)
);
