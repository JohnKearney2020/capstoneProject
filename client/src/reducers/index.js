import {combineReducers} from 'redux';
import {cartReducer} from './cartReducer';
import {etsyReducer} from './etsyReducer';
import {favoritesReducer} from './favoritesReducer';
import {itemListReducer} from './itemReducers';
import {createOrderReducer} from './ordersReducers';
import {productsReducer} from './productsReducer';
import {shoppingCartReducer} from './shoppingCartReducer';
import { signInReducer, updateUserReducer, registerUserReducer } from './userReducers';

export default combineReducers({
    cartReducer,
    etsyReducer,
    favoritesReducer,
    itemListReducer,
    createOrderReducer,
    productsReducer,
    shoppingCartReducer,
    signInReducer,
    updateUserReducer,
    registerUserReducer

})

