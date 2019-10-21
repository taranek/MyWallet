import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import {connect} from 'react-redux';

const internalStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function CurrencySelect(props) {
  const classes = internalStyles();
  const targetCurrency = props.targetCurrency;
  const rates = props.rates;
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    props.dispatch({
        type: "CHANGE_TARGET",
        data: event.target.value,
      });
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
       Target Currency
      </InputLabel>
      <Select
        native
        value={targetCurrency}
        onChange={handleChange()}
        labelWidth={labelWidth}
        inputProps={{
          name: "Target-Currency",
          id: "outlined-age-native-simple"
        }}
      >
        {rates.map((rate, i) => (<option value={rate.to}>{rate.to}</option>))}
      </Select>
    </FormControl>
  );
}
function mapStateToProps(state, props) {
    return {
      rates: state.rates,
      targetCurrency: state.targetCurrency
    };
  };
export default connect(mapStateToProps)(CurrencySelect);
