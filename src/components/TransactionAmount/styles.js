import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

export default makeStyles(theme => ({
    amountPlus: {
        color: green[500]
      },
      amountMinus: {
        color: red[500]
      }
}));
