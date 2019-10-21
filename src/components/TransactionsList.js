import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Button } from "@material-ui/core";
import useSharedStyles from "../styles/SharedStyles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import AmountPipe from "../pipes/AmountPipe";
import TextField from '@material-ui/core/TextField';
function TransactionsList(props) {
  const transactions = props.transactions;
  const sharedStyles = useSharedStyles();
  const [expanded, setExpanded] = React.useState(false);
  const base = props.base;
  const targetCurrency = props.targetCurrency;
  const rate = props.rates.find(rate=>rate.to===targetCurrency).rate;
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function onDelete(transaction) {
    props.dispatch({
      type: "DELETE_TRANSACTION",
      data: transaction,
    });
  }
  function renderPanel(transaction, index) {
    return (
      <ExpansionPanel
        expanded={expanded === index}
        onChange={handleChange(index)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-content-` + index}
          id={"panel-header=" + index}
        >
          <Grid container>
            <Grid item xs={2}>
              {AmountPipe(transaction.amount)} {transaction.base}
            </Grid>
            <Grid item xs={2}>
              {AmountPipe(transaction.amount * rate)} PLN
            </Grid>
            <Grid item xs={8}>
              {transaction.title}
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container display="flex" flex alignContent="center" spacing={1}>
            <Grid item xs={4}>
            <TextField
                id={"timestamp-"+index}
                label="Timestamp"
                value={moment(transaction.timestamp).format('llll')}
                className={sharedStyles.width_100}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
            <TextField
                id={"sender-"+index}
                label="From"
                value={transaction.sender}
                className={sharedStyles.width_100}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item container display="flex"  alignItems='center' justify='flex-end' xs={4}>
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
      <div className={sharedStyles.root}>
        <Paper
          className={[sharedStyles.paper, sharedStyles.expansion_panel_header]}
        >
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Typography className={sharedStyles.expansion_panel_header}>
                {`Amount [${base}]`}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={sharedStyles.expansion_panel_header}>
                {`Amount [${targetCurrency}]`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={sharedStyles.expansion_panel_header}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                align="right"
                className={sharedStyles.expansion_panel_header}
              >
                Details
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {transactions.map((e, i) => renderPanel(e, i))}
      </div>
    </Grid>
  );
}

function mapStateToProps(state, props) {
  return {
    transactions: state.transactions,
    targetCurrency: state.targetCurrency,
    rates:state.rates,
    base: state.base
  };
}
export default connect(mapStateToProps)(TransactionsList);
