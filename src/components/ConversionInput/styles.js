import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

export default makeStyles(theme => ({
  targetCurrency: {
    backgroundColor: blue[100],
    fontWeight: theme.typography.fontWeightBold,
    // padding: theme.spacing(1),
    border: `5px solid ${blue[100]}`,
    borderRadius: theme.spacing(1)
  }
}));
