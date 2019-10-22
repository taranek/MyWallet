import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import useSharedStyles from "../styles/SharedStyles";
import Paper from "@material-ui/core/Paper";

const internalStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function CurrencySelect(props) {
  const classes = internalStyles();
  const sharedStyles = useSharedStyles();
  const targetCurrency = props.targetCurrency;
  const rates = props.rates;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = target => event => {
    props.dispatch({
      type: "CHANGE_TARGET",
      data: event.target.value
    });
  };

  return (
    <Paper className={sharedStyles.paper}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="target-currency-dropdown">
          Target Currency
        </InputLabel>
        <Select
          native
          value={targetCurrency}
          onChange={handleChange()}
          labelWidth={labelWidth}
          inputProps={{
            name: "Target-Currency",
            id: "target-currency-dropdown"
          }}
        >
          {rates.map((rate, i) => (
            <option key={i} value={rate.to}>
              {rate.to}
            </option>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
function mapStateToProps(state) {
  return {
    rates: state.rates,
    targetCurrency: state.targetCurrency
  };
}
export default connect(mapStateToProps)(CurrencySelect);
