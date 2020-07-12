import { UI_START_LOADING, UI_STOP_LOADING } from '../actions/actionType'

const initailState = {
    isLoading : false
}

const reducer = (state = initailState, action) => {
    switch (action.type){
        case UI_START_LOADING: 
            return{
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return{
                ...state,
                isLoading: false
            }
        default:
            return state;    
    }
}

export default reducer;