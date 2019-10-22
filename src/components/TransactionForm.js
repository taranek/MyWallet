import React from "react";
import MaterialUIForm from "react-material-ui-form";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "../styles/SharedStyles";
import store from "../stores/configureStore";
import { connect } from "react-redux";

function TransactionForm(props) {
  const sharedStyles = useSharedStyles();
  const [amount, setAmount] = React.useState("");
  const [title, setTitle] = React.useState("");
  const titleMaxLength = 50;

  function handleFormSubmission() {
    const isTitleValid = validateTitle(title);
    const isAmountValid = validateAmount(amount);

    if (isTitleValid && isAmountValid) {
      setAmount(amount);
      setTitle(title);
      props.dispatch({
        type: "ADD_TRANSACTION",
        data: {
          amount: amount,
          title: title,
          timestamp: moment(moment.now()).clone(),
          base: "EUR",
          person: "Some special guy who uses this app"
        }
      });
      setAmount("");
      setTitle("");
    }
  }
  let validateAmount = amount => !isNaN(amount) && amount !== 0.0;
  let validateTitle = title => title.length < titleMaxLength;

  return (
    <Grid item xs={12}>
      <Paper className={[sharedStyles.paper, sharedStyles.form]}>
        <MaterialUIForm onSubmit={handleFormSubmission}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <TextField
                required
                id="outlined-required"
                label="EUR"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
                error={!validateAmount(amount)}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                id="outlined-required"
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
                error={!validateTitle(title)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                className={sharedStyles.fullWidth}
                color="primary"
                variant="contained"
              >
                Add transaction
              </Button>
            </Grid>
          </Grid>
        </MaterialUIForm>
      </Paper>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    store: store,
    transactions: state.transactions
  };
}
export default connect(mapStateToProps)(TransactionForm);
