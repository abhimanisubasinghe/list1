import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
import productReducer from './reducers/products';
import shopReducer from './reducers/shops';
import userReducer from './reducers/users';
import billReducer from './reducers/bills';
import listReducer from './reducers/lists';

const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    products: productReducer,
    shops: shopReducer,
    users: userReducer,
    bills: billReducer,
    lists: listReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default store;