import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useSharedStyles from "../styles/SharedStyles";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import AmountPipe from "../pipes/AmountPipe";

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
      parseFloat(AmountPipe(max.amount)) > parseFloat(AmountPipe(transaction.amount)) ? max : transaction
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
          className={[internalStyles.chip, sharedStyles.lightBlue].join(' ')}
          color="secondary"
          label={`Highest transaction amount: ${AmountPipe(highest)} ${base}`}
        />
        <Chip
          className={[internalStyles.chip, sharedStyles.lightBlue].join(' ')}
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
