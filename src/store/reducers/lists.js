import { DELETE_LIST, SET_LISTS, REMOVE_LIST, LIST_ADDED, START_ADD_LIST, STOP_UPDATE_LIST, START_UPDATE_LIST, SEARCH_LIST, STOP_SEARCH_LIST, INITIAL_LISTS} from '../actions/actionType'

const initialState = {
    lists: [],
    listAdded: false, 
    listUpdating: false,
    searchList: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LISTS:
            console.log('action',action.lists)
            return {
                ...state,
                lists: action.lists
            }
        
        case INITIAL_LISTS: {
            console.log('clearing lists')
            return {
                lists: [],
                listAdded: false, 
                listUpdating: false,
                searchList: ''
            }
        }

        case SEARCH_LIST: {
            return{
                ...state,
                searchList: action.val
            }
        }

        case STOP_SEARCH_LIST: {
            return{
                ...state,
                searchList: ''
            }
        }
        case REMOVE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => {
                return list.key !== action.key;
                })
            };    

        case START_ADD_LIST: 
            return{
                ...state,
                listAdded: false
            } 
        case START_UPDATE_LIST: 
            return{
                ...state,
                listUpdating: true
            }       
        case STOP_UPDATE_LIST: 
            return{ 
                ...state,
                listUpdating: false
            }    
        case LIST_ADDED: 
            return{
                ...state,
                listAdded: true
            }    
        case DELETE_LIST:
            return{
                ...state,
                lists: state.lists.filter( (list)  => {
                    return list.key !== action.listKey
                  }),
                selectedList: null
            }
        // case SELECT_LIST: 
        //     return{
        //         ...state,
        //         selectedList: state.lists.find(list => {
        //             return list.key === action.listKey
        //         })
        //     }
        // case DESELECT_LIST:
        //     return{
        //         ...state,
        //         selectedList: null
        //     }
        default:
            return state;
    }
};

export default reducer;