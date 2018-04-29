import React from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { requestPosts, togglePostDialog } from "../actions/timeline";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import AddIcon from "@material-ui/icons/Add";
import Button from "material-ui/Button";
import { NewPostDialog } from "../components";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  posts: {
    margin: 20,
    width: 800,
    height: 200,
    padding: 40,
    textAlign: "center"
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

const Timeline = ({ timeline, classes, dispatch, token }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Grid item>
          {timeline.posts.length > 0 ? (
            timeline.posts.map(post => (
              <Paper className={classes.posts}>
                <Card>
                  <CardHeader title="Lorem" />
                  <CardText>Lorem Ipsum</CardText>
                </Card>
              </Paper>
            ))
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
      <AddIcon />
    </Button>
    <NewPostDialog
      open={timeline.postDialog}
      dispatch={dispatch}
      token={token}
    />
  </Grid>
);

export default withStyles(styles)(
  connect(store => ({
    token: store.auth.user.auth_token,
    timeline: store.timeline
  }))(TimelineWrapper)
);
