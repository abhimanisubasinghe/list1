import { DELETE_PRODUCT, SET_PRODUCTS, REMOVE_PRODUCT, PRODUCT_ADDED, START_ADD_PRODUCT, STOP_UPDATE_PRODUCT, START_UPDATE_PRODUCT, SEARCH_PRODUCT, STOP_SEARCH_PRODUCT, SELECT_PRODUCTS, CLEAR_SELECT_PRODUCTS, INITIAL_PRODUCTS} from '../actions/actionType'

const initialState = {
    products: [],
    productAdded: false, 
    productUpdating: false,
    searchProduct: '',
    selectedProducts: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        
        case INITIAL_PRODUCTS: {
            console.log('clearing products')
            return{
                products: [],
                productAdded: false, 
                productUpdating: false,
                searchProduct: '',
                selectedProducts: [],
            }
        }

        case SEARCH_PRODUCT: {
            return{
                ...state,
                searchProduct: action.val
            }
        }

        case STOP_SEARCH_PRODUCT: {
            return{
                ...state,
                searchProduct: ''
            }
        }

        case SELECT_PRODUCTS: {
            console.log('now: ',state.selectedProducts, 'adding: ', action.product)
            let temp = state.selectedProducts.concat(action.product)
            return{
                ...state,
                selectedProducts: temp
            }
        }

        case CLEAR_SELECT_PRODUCTS: {
            return{
                ...state,
                selectedProducts: []
            }
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
        case START_UPDATE_PRODUCT: 
            return{
                ...state,
                productUpdating: true
            }       
        case STOP_UPDATE_PRODUCT: 
            return{ 
                ...state,
                productUpdating: false
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