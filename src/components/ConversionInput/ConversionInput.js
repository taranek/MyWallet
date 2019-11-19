import React from "react";
import TextField from "@material-ui/core/TextField";
import AmountPipe from "../../pipes/AmountPipe";
import { connect } from "react-redux";
import useSharedStyles from "styles/SharedStyles";
import styles from "./styles";
export function ConversionInput(props) {
  const currency = props.currency;
  const rate = props.rate;
  const targetCurrency = props.targetCurrency;
  const classes = styles();
  const handleChange = event => event => {
    let value = event.target.value > 0.001 ? event.target.value : 0.01;
    let currency = event.target.id;
    props.dispatch({
      type: "CHANGE_RATE",
      data: {
        value: AmountPipe(value),
        currency: currency
      }
    });
  };
  return (
    <TextField
      id={currency}
      key={`${currency}-${1}`}
      label={currency}
      value={AmountPipe(rate)}
      onChange={handleChange()}
      type="number"
      className={currency === targetCurrency ? classes.targetCurrency : null}
      InputLabelProps={{
        shrink: true
      }}
      margin="none"
      variant="standard"
    />
    /* <input 
              id={conversion}
              key={`${conversion}-${index}`}
              label={conversion}
              value={AmountPipe(props.rates[conversion])}
              onChange={handleChange()}
              className={sharedStyles.conversion_targetCurrency}
              type='number'
              step={0.10}
            >
            </input> */
  );
}

function mapStateToProps(state) {
  return {
    rates: state.rates,
    targetCurrency: state.targetCurrency
  };
}
export default connect(mapStateToProps)(ConversionInput);
