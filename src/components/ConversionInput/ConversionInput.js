import React from "react";
import TextField from "@material-ui/core/TextField";
import AmountPipe from "../../pipes/AmountPipe";
import { connect } from "react-redux";
import styles from "./styles";
import PropTypes from 'prop-types';

ConversionInput.propTypes ={
    currency: PropTypes.string,
    rate: PropTypes.number,
    targetCurrency: PropTypes.string,
}

export function ConversionInput(props) {
  const currency = props.currency;
  const rate = props.rate;
  const targetCurrency = props.targetCurrency;
  const classes = styles();

  const handleChange = event => {
    let value = event.target.value > 0.01 ? event.target.value : 0.01;
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
      onChange={(e) => handleChange(e)}
      type="number"
      className={currency === targetCurrency ? classes.targetCurrency : null}
      InputLabelProps={{
        shrink: true
      }}
      margin="none"
      variant="standard"
    />
  );
}

function mapStateToProps(state) {
  return {
    rates: state.rates,
    targetCurrency: state.targetCurrency
  };
}
export default connect(mapStateToProps)(ConversionInput);
