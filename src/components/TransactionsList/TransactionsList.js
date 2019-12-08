import React from "react";
import Grid from "@material-ui/core/Grid";
import useSharedStyles from "styles/sharedStyles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TransactionPanel from "components/TransactionPanel/TransactionPanel";
import TransactionListHeader from "components/TransactionListHeader/TransactionListHeader";
import propTypes from "prop-types";

export function TransactionsList(props) {
  const transactions = props.transactions;
  const sharedStyles = useSharedStyles();
  const base = props.base;
  const targetCurrency = props.targetCurrency;

  return (
    <Grid item xs={12}>
      <Paper
        className={[
          sharedStyles.paper,
          sharedStyles.textSecondary,
          sharedStyles.textBold
        ].join(" ")}
      >
        <TransactionListHeader
          base={base}
          targetCurrency={targetCurrency}
        ></TransactionListHeader>
      </Paper>
      {transactions.map((t, i) => {
        return (
          <TransactionPanel
            transaction={t}
            key={t._id}
            index={t._id}
          ></TransactionPanel>
        );
      })}
    </Grid>
  );
}

export function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    targetCurrency: state.targetCurrency,
    rates: state.rates,
    base: state.base
  };
}
TransactionsList.propTypes = {
  transactions: propTypes.array,
  base: propTypes.string,
  rates: propTypes.object,
  targetCurrency: propTypes.string
};

export default connect(mapStateToProps)(TransactionsList);
