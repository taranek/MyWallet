import React from "react";
import Paper from "@material-ui/core/Paper";
import TransactionForm from "components/TransactionForm/TransactionForm";
import useSharedStyles from "styles/sharedStyles";
import withLoading from "hoc/withLoading";
import TransactionsList from "components/TransactionsList/TransactionsList";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import propTypes from 'prop-types';

export function Transactions(props) {
  const transactions = props.transactions;
  const sharedStyles = useSharedStyles();

  const TransactionListWithLoading = withLoading(TransactionsList);
  return (
    <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(" ")}>
      <h2>Transactions</h2>
      <h3>Create new</h3>

      <Grid item xs={12}>
        <Paper className={[sharedStyles.paper, sharedStyles.form].join(" ")}>
          <TransactionForm></TransactionForm>
        </Paper>
      </Grid>

      <h3>History</h3>
      <TransactionListWithLoading loading={transactions===null || transactions === undefined} />
    </Paper>
  );
}
export function mapStateToProps(state) {
  return {
    loading: state.loading,
    transactions:state.transactions
  };
}
export default connect(mapStateToProps)(Transactions);

Transactions.propTypes = {
  loading: propTypes.bool,
}
