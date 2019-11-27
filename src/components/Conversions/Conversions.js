import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ConversionsGrid from "components/ConversionsGrid/ConversionsGrid";
import useSharedStyles from "styles/sharedStyles";
import withLoading from "hoc/withLoading";
import CurrencySelect from "components/CurrencySelect/CurrencySelect";
import { connect } from "react-redux";
export function Conversions(props) {
  const sharedStyles = useSharedStyles();
  const rates = props.rates;
  const CurrencySelectWithLoading = withLoading(CurrencySelect);
  const ConversionGridWithLoading = withLoading(ConversionsGrid);
  return (
    <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(" ")}>
      <h2>Conversions</h2>
      <CurrencySelectWithLoading loading={rates===null}/>
      <Grid container display="flex" flex-direction="row ">
        <ConversionGridWithLoading loading={rates===null}/>
      </Grid>
    </Paper>
  );
}
export function mapStateToProps(state) {
  return {
    rates: state.rates,
  };
}
export default connect(mapStateToProps)(Conversions);
