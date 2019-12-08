import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  my_2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
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
  }
}));
