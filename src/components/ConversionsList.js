import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "../styles/SharedStyles";
import { connect } from "react-redux";
import AmountPipe from "../pipes/AmountPipe";
function ConversionsList(props) {
  const base = props.base;
  const conversions = props.rates;
  const sharedStyles = useSharedStyles();
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
  function renderPanel(conversion, index) {
    return (
      <Paper className={sharedStyles.paper} key={`conversion-${index}`}>
        <Grid container>
          <Grid item xs={5}>
            <TextField
              id={"conversion-base" + index}
              label={base}
              value={AmountPipe(1)}
              className={[sharedStyles.textField, sharedStyles.fullWidth].join(' ')}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            container
            display="flex"
            alignContent="center"
            justify="center"
            xs={2}
          >
            <div>=</div>
          </Grid>
          <Grid item xs={5}>
            <TextField
              id={conversion.to}
              label={conversion.to}
              value={conversion.rate}
              onChange={handleChange()}
              type="number"
              className={[sharedStyles.textField, sharedStyles.fullWidth].join(' ')}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <Grid item>
      {conversions.map((conversion, i) => renderPanel(conversion, i))}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    base: state.base,
    rate: state.rates[0].rate,
    rates: state.rates,
    targetCurrency: state.targetCurrency
  };
}
export default connect(mapStateToProps)(ConversionsList);
