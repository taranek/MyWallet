import React from "react";
import TextField from "@material-ui/core/TextField";
import amountPipe from "pipes/amountPipe";
import { connect } from "react-redux";
import styles from "./styles";
import PropTypes from "prop-types";
import {CHANGE_RATE} from "stores/rates/ratesActions";

export function ConversionInput(props) {
  const currency = props.currency;
  const rate = props.rate;
  const targetCurrency = props.targetCurrency;
  const classes = styles();

  const handleChange = event => {
    let value = event.target.value > 0.01 ? event.target.value : 0.01;
    let currency = event.target.id;
    props.dispatch({
      type: CHANGE_RATE,
      data: {
        value: value,
        currency: currency
      }
    });
  };

  return (
    <TextField
      id={currency}
      key={currency}
      label={currency}
      value={amountPipe(rate)}
      onChange={e => handleChange(e)}
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

export function mapStateToProps(state) {
  return {
    rates: state.rates,
    targetCurrency: state.targetCurrency
  };
}

ConversionInput.propTypes = {
  currency: PropTypes.string,
  rate: PropTypes.number,
  targetCurrency: PropTypes.string
};

export default connect(mapStateToProps)(ConversionInput);
