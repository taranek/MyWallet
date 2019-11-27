import React from "react";
import MaterialUIForm from "react-material-ui-form";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import useSharedStyles from "styles/sharedStyles";
import { connect } from "react-redux";
import amountPipe from "pipes/amountPipe";
import {ADD_TRANSACTION} from "stores/main/actions";
import propTypes from 'prop-types';

export function TransactionForm(props) {
  const sharedStyles = useSharedStyles();
  const [amount, setAmount] = React.useState("");
  const [title, setTitle] = React.useState("");
  const titleMaxLength = 50;

  function handleFormSubmission() {
    if (isTitleValid(title) && isAmountValid(amount)) {
      setAmount(amount);
      setTitle(title);
      
      props.dispatch({
        type: ADD_TRANSACTION,
        data: {
          amount: parseFloat(amountPipe(amount)),
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
  const isNullOrWhitespace = string =>
    string === null || string.trim().length === 0;
  
    const isAmountValid = amount =>
    amount !== null && !isNaN(amount) && amount !== 0.0;
  
    const isTitleValid = title => title !== null && title.length < titleMaxLength;

  return (
        <MaterialUIForm onSubmit={handleFormSubmission}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={2}>
              <TextField
                required
                id="transaction-form-amount"
                label="EUR"
                value={amount}
                onChange={e => {
                  !isNullOrWhitespace(e.target.value)
                    ? setAmount(e.target.value)
                    : setAmount("");
                }}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
                error={!isAmountValid(amount)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                required
                id="transaction-form-title"
                label="Title"
                value={title}
                onChange={e => {
                  !isNullOrWhitespace(e.target.value)
                    ? setTitle(e.target.value)
                    : setTitle("");
                }}
                className={sharedStyles.fullWidth}
                margin="dense"
                variant="outlined"
                error={!isTitleValid(title)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
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
  );
}

export function mapStateToProps(state) {
  return {
    transactions: state.transactions
  };
}

TransactionForm.propTypes = {
  transactions:propTypes.array
}

export default connect(mapStateToProps)(TransactionForm);
