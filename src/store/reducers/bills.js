import { DELETE_BILL, SET_BILLS, REMOVE_BILL, BILL_ADDED, START_ADD_BILL, STOP_UPDATE_BILL, START_UPDATE_BILL, SEARCH_BILL, STOP_SEARCH_BILL, INITIAL_BILLS} from '../actions/actionType'

const initialState = {
    bills: [],
    billAdded: false, 
    billUpdating: false,
    searchBill: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_BILLS:
            console.log('action',action.bills)
            return {
                ...state,
                bills: action.bills
            }

        case INITIAL_BILLS:
            console.log('cleared bills')
            return {
                bills: [],
                billAdded: false, 
                billUpdating: false,
                searchBill: '' 
            }    

        case SEARCH_BILL: {
            return{
                ...state,
                searchBill: action.val
            }
        }

        case STOP_SEARCH_BILL: {
            return{
                ...state,
                searchBill: ''
            }
        }
        case REMOVE_BILL:
            return {
                ...state,
                bills: state.bills.filter(bill => {
                return bill.key !== action.key;
                })
            };    

        case START_ADD_BILL: 
            return{
                ...state,
                billAdded: false
            } 
        case START_UPDATE_BILL: 
            return{
                ...state,
                billUpdating: true
            }       
        case STOP_UPDATE_BILL: 
            return{ 
                ...state,
                billUpdating: false
            }    
        case BILL_ADDED: 
            return{
                ...state,
                billAdded: true
            }    
        case DELETE_BILL:
            return{
                ...state,
                bills: state.bills.filter( (bill)  => {
                    return bill.key !== action.billKey
                  }),
                selectedBill: null
            }
        // case SELECT_BILL: 
        //     return{
        //         ...state,
        //         selectedBill: state.bills.find(bill => {
        //             return bill.key === action.billKey
        //         })
        //     }
        // case DESELECT_BILL:
        //     return{
        //         ...state,
        //         selectedBill: null
        //     }
        default:
            return state;
    }
};

export default reducer;