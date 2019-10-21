import React, {useState, useEffect, useCallback} from 'react';
import MaterialUIForm from "react-material-ui-form";
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
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';

function TransactionForm(props) {  
  const classes = useSharedStyles();
  const [amount, setAmount] = React.useState(0);
  const [title, setTitle] = React.useState('title');
  const transactions = props.transactions;
  function onDelete(id){
      alert("Attempted deleting:"+id);
    }
    function handleFormSubmission(){
    props.dispatch({type:'ADD_TRANSACTION',data:{
        amount:amount,
        title:title,
        timestamp:moment(moment.now()).clone(),
        base:'EUR'
    }})
    setTitle('');
    setAmount('');
    }
    function validateAmount(amount){
        if(!isNaN(amount)){
            setAmount(amount);
        }
    };
    function validateTitle(title){
        if(title.length<30){
            setTitle(title);
        }
    };
    return (
    <Grid item xs={12}>  
      <Paper className={[classes.paper,classes.form]}>
      <MaterialUIForm onSubmit={handleFormSubmission}>
      
      <Grid container flexDirection="row" justifyContent='space-between' alignItems="center" spacing={2}>
      <Grid item xs={2}> 
      <TextField
        required
        id="outlined-required"
        label="EUR"
        value={amount}
        onChange={e=>validateAmount(e.target.value)}
        className={classes.width_100}
        margin="dense"
        variant="outlined"
      /> 
      </Grid>
      <Grid item xs={7}>  
      <TextField
        required
        id="outlined-required"
        label="Title"
        value={title}
        onChange={e=>validateTitle(e.target.value)}
        className={classes.width_100}
        margin="dense"
        variant="outlined"
      />
      </Grid>
      <Grid item xs={3}>  
      <Button 
        type="submit"
        className={classes.width_100}
        color='primary'
        variant='contained'
        >
      Add transaction
      </Button>
      </Grid>
      </Grid>
      </MaterialUIForm>

      </Paper>
    </Grid>)  
}

function mapStateToProps(state,props){
  return {
    store:store,
    transactions:state.transactions,
  }
}
export default connect(mapStateToProps)(TransactionForm);
