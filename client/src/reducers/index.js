import {combineReducers} from 'redux';
import {cartReducer} from './cartReducer';
import {etsyReducer} from './etsyReducer';
import {favoritesReducer} from './favoritesReducer';
// import {itemListReducer} from './itemReducers';
import {createOrderReducer} from './ordersReducers';

// import {productsReducer} from './productsReducer';
// import {shoppingCartReducer} from './shoppingCartReducer';
import { signInReducer, updateUserReducer, registerUserReducer } from './userReducers';
import { itemListReducer, saveItemReducer, deleteItemReducer, itemDetailsReducer} from "./itemReducers";
import {
    orderDetailsReducer,
    userOrderReducer,
    orderListReducer,
    payOrderReducer,
    deleteOrderReducer } from './ordersReducers';

export default combineReducers({
    cart: cartReducer,
    etsyReducer,
    favoritesReducer,
    itemListReducer,
    createOrderReducer,
    // productsReducer,
    // shoppingCartReducer,
    signInReducer,
    updateUserReducer,
    registerUserReducer,
    itemList: itemListReducer,
    itemDetails : itemDetailsReducer,
    userSignIn: signInReducer,
    userRegister: registerUserReducer,
    saveItem: saveItemReducer,
    deleteItem: deleteItemReducer,
    createOrder: createOrderReducer,
    orderDetails : orderDetailsReducer,
    payOrder : payOrderReducer,
    updateUser: updateUserReducer,
    myOrderList: userOrderReducer,
    orderList: orderListReducer,
    orderDelete: deleteOrderReducer

})

