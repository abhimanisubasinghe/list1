import { DELETE_SHOP, SET_SHOPS, REMOVE_SHOP, SHOP_ADDED, START_ADD_SHOP,SEARCH_SHOP,STOP_SEARCH_SHOP, SELECT_SHOPS, CLEAR_SELECT_SHOPS } from '../actions/actionType'

const initialState = {
    shops: [],
    shopAdded: false, 
    searchShop: '',
    selectedShops: [{'shop': null}]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_SHOPS:
            return {
                ...state,
                shops: action.shops
            }
        case REMOVE_SHOP:
            return {
                ...state,
                shops: state.shops.filter(shop => {
                return shop.key !== action.key;
                })
            };    

        case SEARCH_SHOP: {
            return{
                ...state,
                searchShop: action.val
            }
        }

        case STOP_SEARCH_SHOP: {
            return{
                ...state,
                searchShop: ''
            }
        }

        case SELECT_SHOPS: {
            console.log('now: ',state.selectedShops, 'adding: ', action.shop)
            let temp = state.selectedShops.concat(action.shop)
            return{
                ...state,
                selectedShops: temp
            }
        }

        case CLEAR_SELECT_SHOPS: {
            return{
                ...state,
                selectedShops: []
            }
        }

        case START_ADD_SHOP: 
            return{
                ...state,
                shopAdded: false
            }    
        case SHOP_ADDED: 
            return{
                ...state,
                shopAdded: true
            }    
        case DELETE_SHOP:
            return{
                ...state,
                shops: state.shops.filter( (shop)  => {
                    return shop.key !== action.shopKey
                  }),
                selectedShop: null
            }
        // case SELECT_SHOP: 
        //     return{
        //         ...state,
        //         selectedShop: state.shops.find(shop => {
        //             return shop.key === action.shopKey
        //         })
        //     }
        // case DESELECT_SHOP:
        //     return{
        //         ...state,
        //         selectedShop: null
        //     }
        default:
            return state;
    }
};

export default reducer;