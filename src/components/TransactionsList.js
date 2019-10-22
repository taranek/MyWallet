import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Button } from "@material-ui/core";
import useSharedStyles from "../styles/SharedStyles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import AmountPipe from "../pipes/AmountPipe";
import TextField from "@material-ui/core/TextField";
function TransactionsList(props) {
  const transactions = props.transactions;
  const sharedStyles = useSharedStyles();
  const [expanded, setExpanded] = React.useState(false);
  const base = props.base;
  const targetCurrency = props.targetCurrency;
  const rate = props.rates.find(rate => rate.to === targetCurrency).rate;
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function onDelete(transaction) {
    props.dispatch({
      type: "DELETE_TRANSACTION",
      data: transaction
    });
  }
  let isAmountPositive = amount => amount > 0;
  let assignColor = amount => {
    return isAmountPositive(amount)
      ? sharedStyles.amountPlus
      : sharedStyles.amountMinus;
  };
  let assignFromToLabel = amount => {
    return isAmountPositive(amount) ? "Received from" : "Sent to";
  };
  function renderPanel(transaction, index) {
    return (
      <ExpansionPanel
        expanded={expanded === index}
        onChange={handleChange(index)}
        key={`transaction-${index}`}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-content-` + index}
          id={"panel-header=" + index}
        >
          <Grid container>
            <Grid
              item
              xs={2}
              className={[sharedStyles.textBold,assignColor(transaction.amount)].join(' ')}
            >
              {AmountPipe(transaction.amount)} {transaction.base}
            </Grid>
            <Grid
              item
              xs={2}
              className={[sharedStyles.textBold, assignColor(transaction.amount) ].join(' ')}
            >
              {AmountPipe(transaction.amount * rate)} {targetCurrency}
            </Grid>
            <Grid item xs={8} className={sharedStyles.textBold}>
              {transaction.title}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container display="flex" alignContent="center" spacing={1}>
            <Grid item xs={5}>
              <TextField
                id={"timestamp-" + index}
                label="Timestamp"
                value={moment(transaction.timestamp).format("llll")}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id={"person-" + index}
                label={assignFromToLabel(transaction.amount)}
                value={transaction.person}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              container
              display="flex"
              alignItems="center"
              justify="flex-end"
              xs={2}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => onDelete(transaction)}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  return (
    <Grid item xs={12}>
      <Paper
        className={[sharedStyles.paper,sharedStyles.textSecondary,sharedStyles.textBold].join(' ')}
      >
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography
              className={[sharedStyles.textSecondary, sharedStyles.textBold].join(' ')}
            >
              {`Amount [${base}]`}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={[sharedStyles.textSecondary, sharedStyles.textBold].join(' ')}
            >
              {`Amount [${targetCurrency}]`}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={[sharedStyles.textSecondary, sharedStyles.textBold].join(' ')}
            >
              Title
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              align="right"
              className={[sharedStyles.textSecondary, sharedStyles.textBold].join(' ')}
            >
              Details
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {transactions.map((transaction, i) => renderPanel(transaction, i))}
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
