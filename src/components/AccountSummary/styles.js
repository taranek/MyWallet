import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  chip: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
}));
