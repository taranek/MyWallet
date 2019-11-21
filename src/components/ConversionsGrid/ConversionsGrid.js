import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "styles/sharedStyles";
import { connect } from "react-redux";
import ConversionInput from "components/ConversionInput/ConversionInput";
import propTypes from 'prop-types';
function ConversionsGrid(props) {
  const rates = props.rates;
  const conversions = Object.keys(rates);
  const sharedStyles = useSharedStyles();
  function renderPanel(conversion, index) {
    return (
      <Grid item key={`${conversion}-container-${index}`} xs={2} md={6} lg={4}>
        <ConversionInput
          currency={conversion}
          rate={Number(rates[conversion])}
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
ConversionsGrid.propTypes = {
  rates:propTypes.object,
}
export default connect(mapStateToProps)(ConversionsGrid);
