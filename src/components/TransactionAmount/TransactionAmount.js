import React from "react";
import amountPipe from "pipes/amountPipe";
import useSharedStyles from "styles/sharedStyles";
import styles from "./styles";
import PropTypes from "prop-types";

export default function TransactionAmount(props) {
  const currency = props.currency;
  const amount = props.amount;
  const sharedStyles = useSharedStyles();
  const internalStyles = styles();
  const assignColor = amount => {
    return amount > 0 ? internalStyles.amountPlus : internalStyles.amountMinus;
  };

  return (
    <div className={[sharedStyles.textBold, assignColor(amount)].join(" ")}>
      {amountPipe(amount)} {currency}
    </div>
  );
}
TransactionAmount.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string
};
