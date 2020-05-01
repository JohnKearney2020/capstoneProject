import thunk from "redux-thunk";
import Cookie from "js-cookie";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { itemListReducer } from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducer";
import { favoritesReducer } from "./reducers/favoritesReducer";

//import { signInReducer, updateUserReducer, registerUserReducer } from './reducers/userReducers';

// import { createOrderReducer,
//         orderDetailsReducer,
//         userOrderReducer,
//         orderListReducer,
//         payOrderReducer,
//         deleteOrderReducer } from './reducers/ordersReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userDetails = Cookie.getJSON("userDetails") || null;

const intitialState = {
  cart: {
    cartItems: [{ id: 1, title: "shoes", price: 12.99 }],
    shipping: {},
    payment: {},
  },
  userSign: { userDetails },
  favorites: { etsyList: [], productsList: [] },
};

const rootReducers = combineReducers({
  itemList: itemListReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
});

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  intitialState,
  enhancer(applyMiddleware(thunk))
);

export default store;
