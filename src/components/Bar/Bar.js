import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import withLoading from "hoc/withLoading";

export function Bar(props) {
  const loading = props.loading;
  const ToolBarWithLoading = withLoading(Toolbar)
  return (
    <AppBar>
      <ToolBarWithLoading loading={loading}>{props.children}</ToolBarWithLoading>
    </AppBar>
  );
}
export function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}
export default connect(mapStateToProps)(Bar);