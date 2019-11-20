import React from "react";
import Grid from "@material-ui/core/Grid";
import useSharedStyles from "styles/SharedStyles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TransactionPanel from "../TransactionPanel/TransactionPanel";
import TableHeader from './../TableHeader/TableHeader';
function TransactionsList(props) {
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
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TableHeader>
                {`Amount [${base}]`}
            </TableHeader>
          </Grid>
          <Grid item xs={2}>
            <TableHeader>
                {`Amount [${targetCurrency}]`}
            </TableHeader>
          </Grid>
          <Grid item xs={6}>
            <TableHeader>
              Title
            </TableHeader>
          </Grid>
          <Grid item xs={2}>
            <TableHeader
              align='right'
            >
              Details
            </TableHeader>
          </Grid>
        </Grid>
      </Paper>
      {transactions.map((transaction, i) => {
        return (
          <TransactionPanel
            transaction={transaction}
            key={transaction.timestamp}
            index={i}
          ></TransactionPanel>
        );
      })}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    targetCurrency: state.targetCurrency,
    rates: state.rates,
    base: state.base
  };
}
export default connect(mapStateToProps)(TransactionsList);
