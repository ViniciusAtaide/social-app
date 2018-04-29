import React from "react";
import { withStyles } from "material-ui/styles";
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

class WrapperLoginSubscribe extends React.Component {
  state = {
    subscribeToggle: false
  };

  toggleSubscribe = () => {
    this.setState({ subscribeToggle: !this.state.subscribeToggle });
  };

  render() {
    return this.state.subscribeToggle ? (
      <Subscribe {...this.props} toggleSubscribe={this.toggleSubscribe} />
    ) : (
      <Login {...this.props} toggleSubscribe={this.toggleSubscribe} />
    );
  }
}

export default connect(state => ({
  signinError: state.auth.signinError,
  loginError: state.auth.loginError
}))(withStyles(styles)(WrapperLoginSubscribe));
