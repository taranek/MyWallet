import {createStore} from 'redux';
import moment from 'moment';
var defaultState = {
    base:'EUR',
    rate:3.99,
    targetCurrency:'CHF',
    rates:[
        {
            to:'PLN',
        },
    ],
    transactions:[      
        {
            timestamp:moment([1996]),
            amount: -100.00,
            base:'EUR',
            title:'Lorem ipsum dolor sit amet',
        },
        {
            timestamp:moment([2002]),
            amount: -45.00,
            base:'EUR',
            title:'Lorem ipsum dolor sit amet',
        },
    ]
};
function amount(state=defaultState,action){
     console.log('state:'+JSON.stringify(state))
    switch (action.type){
        case 'CHANGE_RATE':
            return {
                    ...state,
                    rate:action.data,
            };
        case 'ADD_TRANSACTION':
            return {
                    ...state,
                    transactions:state.transactions.concat(action.data)
            };
        case 'DELETE_TRANSACTION':
            return {
                    ...state,
                    transactions:arrayRemove(state.transactions,action.data)
            };
        default:
            return state;
    }

    
}
function arrayRemove(arr, timestampToRemove) {
    return arr.filter(el=>el!==timestampToRemove);
 }
 
var store = createStore(amount);
export default store;