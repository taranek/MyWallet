import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import useSharedStyles from '../styles/SharedStyles';
import store from '../stores/configureStore';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import AmountPipe from '../pipes/AmountPipe';
function ConversionsList(props) {  

  const base = props.base;
  const rate = props.rate;
  const conversions = props.rates;
  const classes = useSharedStyles();
  
  const handleChange = panel => (event, isExpanded) => {
    let value = event.target.value>0.001? event.target.value : 0.01;
    props.dispatch({type:'CHANGE_RATE',data: AmountPipe(value)})
  };
  function renderPanel(conversion,index){
    return (
        <Paper className={classes.paper}> 
        <Grid container>
        <Grid item xs={12} md={5}>
        <TextField
            id="outlined-number"
            label={base}
            value={AmountPipe(1)}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            margin="normal"
            variant="outlined"
            />      
        </Grid>    
        <Grid container display='flex' alignContent='center' justify='center' xs={12} md={2}>
            <Box textAlign='center'>
              =
            </Box>
        </Grid> 
        <Grid item xs={12} md={5}>
          <TextField
            id="outlined-number"
            label={conversion.to}
            value={rate}
            onChange={handleChange()}
            type="number"
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            margin="normal"
            variant="outlined"
            />
            </Grid>
            </Grid>
            </Paper>
    )
  }
  
    return (
    <Grid item xs={12}>  
      <div className={classes.root}>
        {conversions.length>0? null : <LinearProgress color="secondary" variant="query" /> }
        {(conversions instanceof Array) ? conversions.map((e,i)=>(renderPanel(e,i))) : null}
      </div>
    </Grid>)  
}

function mapStateToProps(state,props){
  return {
    store:store,
    base:state.base,
    rate:state.rate,
    rates:state.rates
  }
}
export default connect(mapStateToProps)(ConversionsList);