import { DELETE_PRODUCT, SET_PRODUCTS, REMOVE_PRODUCT, PRODUCT_ADDED, START_ADD_PRODUCT} from '../actions/actionType'

const initialState = {
    products: [],
    productAdded: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => {
                return product.key !== action.key;
                })
            };    

        case START_ADD_PRODUCT: 
            return{
                ...state,
                productAdded: false
            }    
        case PRODUCT_ADDED: 
            return{
                ...state,
                productAdded: true
            }    
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter( (product)  => {
                    return product.key !== action.productKey
                  }),
                selectedProduct: null
            }
        // case SELECT_PRODUCT: 
        //     return{
        //         ...state,
        //         selectedProduct: state.products.find(product => {
        //             return product.key === action.productKey
        //         })
        //     }
        // case DESELECT_PRODUCT:
        //     return{
        //         ...state,
        //         selectedProduct: null
        //     }
        default:
            return state;
    }
};

export default reducer;