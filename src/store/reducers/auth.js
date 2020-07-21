import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from "../actions/actionType"

const initialState = {
    token: null,
    expiryDate: null,
    email: null,
    name: null,
    Id: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AUTH_SET_TOKEN: 
            return{
                ...state,
                token: action.token,
                expiryDate: action.expiryDate,
                email: action.email,
                name: action.name,
                Id: action.Id
            }
        case AUTH_REMOVE_TOKEN: 
            return{
                ...state,
                token: null,
                expiryDate: null,
                email: null,
                name: null,
                Id: null
            }    
        default:
            return state;    
    }
}

export default reducer;