import React from "react";
import useSharedStyles from "styles/SharedStyles";
import { connect } from "react-redux";
import styles from "./styles";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import AmountPipe from "../../pipes/AmountPipe";

export function AccountSummary(props) {
  const internalStyles = styles();
  const sharedStyles = useSharedStyles();
  const isThereAnyTransaction = props.transactions.length !== 0;
  const highest = isThereAnyTransaction
    ? getHighestTransaction().amount
    : AmountPipe(0);
  const base = props.base;
  const total = isThereAnyTransaction ? calculateTotal() : AmountPipe(0);

  function getHighestTransaction() {
    return props.transactions.reduce((max, transaction) =>
      parseFloat(AmountPipe(max.amount)) >
      parseFloat(AmountPipe(transaction.amount))
        ? max
        : transaction
    );
  }
  function calculateTotal() {
    return props.transactions.reduce(
      (sum, transaction) => parseFloat(sum) + parseFloat(transaction.amount),
      0
    );
  }
  return (
    <React.Fragment>
      <Box display="flex" alignSelf="flex-end">
        <Chip
          className={[internalStyles.chip, sharedStyles.lightBlue].join(" ")}
          color="secondary"
          id="highest-amount"
          label={`Highest transaction amount: ${AmountPipe(highest)} ${base}`}
        />
        <Chip
          className={[internalStyles.chip, sharedStyles.lightBlue].join(" ")}
          color="secondary"
          id="total-amount"
          label={`Transactions total amount: ${AmountPipe(total)} ${base}`}
        />
      </Box>
    </React.Fragment>
  );
}

export function mapStateToProps(state, props) {
  return {
    transactions: state.transactions,
    base: state.base
  };
}
export default connect(mapStateToProps)(AccountSummary);
