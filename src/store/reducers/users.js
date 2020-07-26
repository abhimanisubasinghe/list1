import { DELETE_USER, SET_USERS, REMOVE_USER, USER_ADDED, START_ADD_USER,SEARCH_USER,STOP_SEARCH_USER, LOGIN_USER, LOGOUT_USER, SELECT_USERS, CLEAR_SELECT_USERS } from '../actions/actionType'

const initialState = {
    users: [],
    userAdded: false, 
    searchUser: '',
    loggedUserName: '',
    loggedUserEmail: '',
    loggedUserContactNumber: '',
    selectedUsers: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USERS:
            console.log('on user action', action.users)
            return {
                ...state,
                users: action.users
            }

        case SELECT_USERS: {
            console.log('now: ',state.selectedUsers, 'adding: ', action.user)
            let temp = state.selectedUsers.concat(action.user)
            return{
                ...state,
                selectedUsers: temp
            }
        }

        case CLEAR_SELECT_USERS: {
            return{
                ...state,
                selectedUsers: []
            }
        }    

        case LOGIN_USER:{
            console.log('action in login', action)
            return{
                ...state,
                loggedUserName: action.userName,
                loggedUserEmail: action.email,
                loggedUserContactNumber: action.contactNumber
            }
        }
        case LOGOUT_USER:{
            return{
                ...state,
                loggedUserName: '',
                loggedUserEmail: '',
                loggedUserContactNumber: ''
            }
        }    
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => {
                return user.key !== action.key;
                })
            };    

        case SEARCH_USER: {
            return{
                ...state,
                searchUser: action.val
            }
        }

        case STOP_SEARCH_USER: {
            return{
                ...state,
                searchUser: ''
            }
        }

        case START_ADD_USER: 
            return{
                ...state,
                userAdded: false
            }    
        case USER_ADDED: 
            return{
                ...state,
                userAdded: true
            }    
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter( (user)  => {
                    return user.key !== action.userKey
                  }),
                selectedUser: null
            }
        // case SELECT_USER: 
        //     return{
        //         ...state,
        //         selectedUser: state.users.find(user => {
        //             return user.key === action.userKey
        //         })
        //     }
        // case DESELECT_USER:
        //     return{
        //         ...state,
        //         selectedUser: null
        //     }
        default:
            return state;
    }
};

export default reducer;