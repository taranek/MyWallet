import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "20px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  color_accent: {
    backgroundColor: blue[50]
  },
  expansion_panel_header: {
    backgroundColor: blue[100],
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.secondary
  },
  color_white: {
    backgroundColor: "white"
  },
  company: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    flexShrink: 0
  },
  amount: {
    flexBasis: "15%",
    fontSize: theme.typography.pxToRem(14)
  },
  title: {
    fontSize: theme.typography.pxToRem(25),
    color: theme.palette.grey.light
  },
  description: {
    fontSize: theme.typography.pxToRem(12)
  },
  amount: {
    flexBasis: "40%",
    fontSize: theme.typography.pxToRem(14)
  },
  width_100: {
    width: "100%"
  }
}));
