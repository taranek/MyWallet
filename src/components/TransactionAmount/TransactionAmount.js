import React from 'react';
import AmountPipe from 'pipes/AmountPipe';
import useSharedStyles from 'styles/SharedStyles';
export default function TransactionAmount(props) {
    const currency = props.currency;
    const amount = props.amount;
    const sharedStyles = useSharedStyles();
    
    const assignColor = amount => {
      return amount > 0
        ? sharedStyles.amountPlus
        : sharedStyles.amountMinus;
    };
 
    return (
        <div
            className={[sharedStyles.textBold, assignColor(amount)].join(" ")}>
            {AmountPipe(amount)} {currency}
        </div>
  );
}
