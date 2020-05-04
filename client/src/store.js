import thunk from "redux-thunk";
import Cookie from "js-cookie";
import rootReducers from './reducers'

import { createStore, applyMiddleware, compose } from "redux";

<<<<<<< HEAD
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { itemListReducer, saveItemReducer, deleteItemReducer, itemDetailsReducer} from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducer";
import { signInReducer, updateUserReducer, registerUserReducer } from './reducers/userReducers';
import { createOrderReducer,
        orderDetailsReducer,
        userOrderReducer,
        orderListReducer,
        payOrderReducer,
        deleteOrderReducer } from './reducers/ordersReducers';
=======



>>>>>>> TemplateSites

const cartItems = Cookie.getJSON("cartItems") || [];
const userDetails = Cookie.getJSON("userDetails") || null;

<<<<<<< HEAD
const initialState = { cart : {cartItems, shipping : {}, payment: {}}, userSignIn:{userDetails}}
const rootReducers = combineReducers({
  itemList: itemListReducer,
  itemDetails : itemDetailsReducer,
  cart: cartReducer,
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

  
});
=======
const intitialState = {}


>>>>>>> TemplateSites

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  initialState,
  enhancer(applyMiddleware(thunk))
);

export default store;
