import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Button } from "@material-ui/core";
import useSharedStyles from "styles/SharedStyles";
import { connect } from "react-redux";
import AmountPipe from "../../pipes/AmountPipe";
import TextField from "@material-ui/core/TextField";

function TransactionPanel(props) {
  const transaction = props.transaction;
  const index = props.index;
  const sharedStyles = useSharedStyles();
  const targetCurrency = props.targetCurrency;
  const [expanded, setExpanded] = React.useState(false);
  const rate = props.rates[targetCurrency];
  const assignColor = amount => {
    return isAmountPositive(amount)
      ? sharedStyles.amountPlus
      : sharedStyles.amountMinus;
  };
  const assignFromToLabel = amount => {
    return isAmountPositive(amount) ? "Received from" : "Sent to";
  };

  function onDelete(transaction) {
    props.dispatch({
      type: "DELETE_TRANSACTION",
      data: transaction
    });
  }
  const isAmountPositive = amount => amount > 0;
  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      key={`transaction-${transaction.timestamp}`}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-content-` + index}
        id={"panel-header-" + index}
      >
        <Grid container>
          <Grid
            item
            xs={2}
            className={[
              sharedStyles.textBold,
              assignColor(transaction.amount)
            ].join(" ")}
          >
            {AmountPipe(transaction.amount)} {transaction.base}
          </Grid>
          <Grid
            item
            xs={2}
            className={[
              sharedStyles.textBold,
              assignColor(transaction.amount)
            ].join(" ")}
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

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    targetCurrency: state.targetCurrency,
    rates: state.rates
  };
}
export default connect(mapStateToProps)(TransactionPanel);
