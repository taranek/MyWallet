import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TransactionList from "../components/TransactionsList";
import ConversionsList from "../components/ConversionsList";
import useSharedStyles from "../styles/SharedStyles";
import store from "../stores/configureStore";
import Bar from "../components/Bar";
import Typography from "@material-ui/core/Typography";
import { Provider } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import AccountSummary from "../components/AccountSummary";
import Box from "@material-ui/core/Box";
import CurrencySelect from "../components/CurrencySelect";
export default function CenteredGrid() {
  const sharedStyles = useSharedStyles();
  return (
    <Provider store={store}>
      <Bar>
        <Box
          className={sharedStyles.fullWidth}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography variant="h1" className={sharedStyles.appTitle}>
            My wallet
          </Typography>
          <AccountSummary></AccountSummary>
        </Box>
      </Bar>
      <Box p={2} my={5} py={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(' ')}>
              <h2>Transactions</h2>
              <CurrencySelect></CurrencySelect>
              <h3>Create new</h3>
              <TransactionForm></TransactionForm>
              <h3>History</h3>
              <TransactionList></TransactionList>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(' ')}>
              <h2>Conversions</h2>
              <ConversionsList></ConversionsList>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}
