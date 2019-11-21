import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default Cmp => {
  return class extends Component {
    render() {
      const { loading, ...passThroughProps } = this.props;
      if (loading) {
        return <LinearProgress />;
      }
      return <Cmp {...passThroughProps} />;
    }
  };
};
