import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import withLoading from "hoc/withLoading";

export function Bar(props) {
  const transactions = props.transactions;
  const ToolBarWithLoading = withLoading(Toolbar);
  return (
    <AppBar>
      <ToolBarWithLoading
        loading={transactions === null || transactions === undefined}
      >
        {props.children}
      </ToolBarWithLoading>
    </AppBar>
  );
}
export function mapStateToProps(state) {
  return {
    transactions: state.transactions
  };
}
export default connect(mapStateToProps)(Bar);
