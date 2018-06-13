import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Login, Subscribe } from "../components";

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

const toggleSubscribe = () => ({ type: "TOGGLE_SUBSCRIBE" });

const initialState = {
  subscribeToggle: false
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SUBSCRIBE":
      return { ...state, subscribeToggle: !state.subscribeToggle };
    default:
      return state;
  }
};

const WrapperLoginSubscribe = props =>
  props.subscribeToggle ? (
    <Subscribe
      {...props}
      toggleSubscribe={() => props.dispatch(toggleSubscribe())}
    />
  ) : (
    <Login
      {...props}
      toggleSubscribe={() => props.dispatch(toggleSubscribe())}
    />
  );

export default connect(state => {
  return {
    signinError: state.context.signinError,
    loginError: state.context.loginError,
    subscribeToggle: state.auth.subscribeToggle
  };
})(withStyles(styles)(WrapperLoginSubscribe));
