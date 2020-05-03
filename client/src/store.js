import thunk from "redux-thunk";
import Cookie from "js-cookie";
import rootReducers from './reducers'

import { createStore, applyMiddleware, compose } from "redux";





const cartItems = Cookie.getJSON("cartItems") || [];
const userDetails = Cookie.getJSON("userDetails") || null;

const intitialState = {}



const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  intitialState,
  enhancer(applyMiddleware(thunk))
);

export default store;
