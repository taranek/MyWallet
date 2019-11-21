import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ConversionsGrid from "components/ConversionsGrid/ConversionsGrid";
import useSharedStyles from "styles/sharedStyles";
import withLoading from "hoc/withLoading";
import CurrencySelect from "components/CurrencySelect/CurrencySelect";
import { connect } from "react-redux";

export function Conversions(props) {
  const loading = props.loading;
  const sharedStyles = useSharedStyles();
  
  const CurrencySelectWithLoading = withLoading(CurrencySelect);
  const ConversionGridWithLoading = withLoading(ConversionsGrid);

  return (
    <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(" ")}>
      <h2>Conversions</h2>
      <CurrencySelectWithLoading loading={loading}/>
      <Grid container display="flex" flex-direction="row ">
        <ConversionGridWithLoading loading={loading}/>
      </Grid>
    </Paper>
  );
}
export function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}
export default connect(mapStateToProps)(Conversions);
