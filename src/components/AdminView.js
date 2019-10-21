import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import TransactionList from './TransactionsList';
import ConversionsList from './ConversionsList';
import useSharedStyles from '../styles/SharedStyles';
import store from '../stores/configureStore';
import Bar from './Bar';
import Typography from '@material-ui/core/Typography';
import {Provider} from 'react-redux';
import TransactionForm from './TransactionForm';
import AccountSummary from './AccountSummary';
import Box from '@material-ui/core/Box';
export default function CenteredGrid() {
  const classes = useSharedStyles();
  return (
    <div className={classes.root}>
        <Provider store={store}>
        <Bar>
            <Box className={classes.width_100} display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography  variant="h1" className={classes.title}>
            My wallet
             </Typography>
             <AccountSummary></AccountSummary>
            </Box>
        </Bar>
    <Box p={2} my={5} py={5}>
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Paper className={[classes.paper,classes.color_accent]}>
                    <h2>Transactions</h2>
                    <h3>Create new</h3>
                    <TransactionForm></TransactionForm>
                    <h3>History</h3>
                    <TransactionList></TransactionList>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={[classes.paper,classes.color_accent]}>
                    <h2>Conversions</h2>   
                    
                        <ConversionsList hello='gitara'></ConversionsList>
                    
                </Paper>
            </Grid>
        </Grid>
    </Box>
    </Provider> 
    </div>
  );
}