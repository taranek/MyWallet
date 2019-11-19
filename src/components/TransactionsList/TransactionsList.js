import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useSharedStyles from "styles/SharedStyles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TransactionPanel from "../TransactionPanel/TransactionPanel";
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
            <Typography
              className={[
                sharedStyles.textSecondary,
                sharedStyles.textBold
              ].join(" ")}
            >
              {`Amount [${base}]`}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={[
                sharedStyles.textSecondary,
                sharedStyles.textBold
              ].join(" ")}
            >
              {`Amount [${targetCurrency}]`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={[
                sharedStyles.textSecondary,
                sharedStyles.textBold
              ].join(" ")}
            >
              Title
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              align="right"
              className={[
                sharedStyles.textSecondary,
                sharedStyles.textBold
              ].join(" ")}
            >
              Details
            </Typography>
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
