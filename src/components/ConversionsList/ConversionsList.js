import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "styles/SharedStyles";
import { connect } from "react-redux";
import AmountPipe from "../../pipes/AmountPipe";
import ConversionInput from "./../ConversionInput/ConversionInput";
function ConversionsList(props) {
  const rates = props.rates;
  const conversions = Object.keys(rates);
  const sharedStyles = useSharedStyles();

  function renderPanel(conversion, index) {
    return (
      <Grid item key={`${conversion}-container`} xs={2} md={6} lg={4}>
        <ConversionInput
          currency={conversion}
          rate={rates[conversion]}
        ></ConversionInput>
      </Grid>
    );
  }

  return (
    <Paper className={sharedStyles.paper}>
      <Grid container spacing={2}>
        {conversions.map((conversion, i) => renderPanel(conversion, i))}
      </Grid>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    rates: state.rates
  };
}
export default connect(mapStateToProps)(ConversionsList);
