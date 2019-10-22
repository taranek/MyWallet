import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  lightBlue: {
    backgroundColor: blue[50]
  },
  textBold: {
    fontWeight: theme.typography.fontWeightBold
  },
  textSecondary: {
    backgroundColor: blue[100],
    color: theme.palette.text.secondary
  },
  appTitle: {
    fontSize: theme.typography.pxToRem(25),
    color: theme.palette.grey.light
  },
  fullWidth: {
    width: "100%"
  },

  amountPlus: {
    color: green[500]
  },
  amountMinus: {
    color: red[500]
  }
}));
