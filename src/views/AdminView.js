import React from "react";
import Grid from "@material-ui/core/Grid";
import useSharedStyles from "styles/sharedStyles";
import store from "stores/main/store";
import Bar from "components/Bar/Bar";
import Typography from "@material-ui/core/Typography";
import { Provider } from "react-redux";
import AccountSummary from "components/AccountSummary/AccountSummary";
import Box from "@material-ui/core/Box";
import Conversions from "components/Conversions/Conversions";
import Transactions from "components/Transactions/Transactions";
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
            <Transactions></Transactions>
          </Grid>
          <Grid item xs={12} md={3}>
            <Conversions></Conversions>
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}
