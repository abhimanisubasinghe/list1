import { DELETE_PLACE, SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE} from '../actions/actionType'

const initialState = {
    places: [],
    placeAdded: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        // case ADD_PLACE:
        //     return{
        //         ...state,
        //         places: state.places.concat({
        //             key: Math.random(),
        //             name: action.placeName,
        //             location: action.location,
        //             image: {
        //               uri: action.image.uri
        //             }
        //           }
        //           )
        //     }
        
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            }
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                return place.key !== action.key;
                })
            };    

            case START_ADD_PLACE: 
            return{
                ...state,
                placeAdded: false
            }    
        case PLACE_ADDED: 
            return{
                ...state,
                placeAdded: true
            }    
        case DELETE_PLACE:
            return{
                ...state,
                places: state.places.filter( (place)  => {
                    return place.key !== action.placeKey
                  }),
                selectedPlace: null
            }
        // case SELECT_PLACE: 
        //     return{
        //         ...state,
        //         selectedPlace: state.places.find(place => {
        //             return place.key === action.placeKey
        //         })
        //     }
        // case DESELECT_PLACE:
        //     return{
        //         ...state,
        //         selectedPlace: null
        //     }
        default:
            return state;
    }
};

export default reducer;