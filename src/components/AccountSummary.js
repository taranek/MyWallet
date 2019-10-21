import React, { useState, useEffect, useCallback } from "react";
import MaterialUIForm from "react-material-ui-form";
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
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "../styles/SharedStyles";
import store from "../stores/configureStore";
import { connect } from "react-redux";
import Input from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import AmountPipe from "../pipes/AmountPipe";
import CurrencySelect from '../components/CurrencySelect'
const useStyles = makeStyles(theme => ({
  chip: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
}));
function AccountSummary(props) {
  const internalStyles = useStyles();
  const sharedStyles = useSharedStyles();
  const isThereAnyTransaction = props.transactions.length !== 0;
  const highest = isThereAnyTransaction
    ? getHighestTransaction().amount
    : AmountPipe(0);
  const base = props.base;
  const total = isThereAnyTransaction ? calculateTotal() : AmountPipe(0);

  function getHighestTransaction() {
    return props.transactions.reduce((max, transaction) =>
      max.amount > transaction.amount ? max : transaction
    );
  }
  function calculateTotal() {
    return props.transactions.reduce(
      (sum, transaction) =>
        parseFloat(parseFloat(sum) + parseFloat(transaction.amount)),
      0
    );
  }
  return (
    <React.Fragment>
      <Box display="flex" alignSelf="flex-end">
        <Chip
          className={[internalStyles.chip, sharedStyles.color_accent]}
          color="secondary"
          label={`Highest transaction amount: ${AmountPipe(highest)} ${base}`}
        />
        <Chip
          className={[internalStyles.chip, sharedStyles.color_accent]}
          color="secondary"
          label={`Transactions total amount: ${AmountPipe(total)} ${base}`}
        />
      </Box>
    </React.Fragment>
  );
}

function mapStateToProps(state, props) {
  return {
    transactions: state.transactions,
    base: state.base
  };
}
export default connect(mapStateToProps)(AccountSummary);
