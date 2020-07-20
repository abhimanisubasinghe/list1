import { DELETE_SHOP, SET_SHOPS, REMOVE_SHOP, SHOP_ADDED, START_ADD_SHOP, } from '../actions/actionType'

const initialState = {
    shops: [],
    shopAdded: false, 
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