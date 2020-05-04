
import {
  ADD_ITEM,
  REMOVE_ITEM,
  SAVE_SHIPPING_DET,
  SAVE_PAYMENT_DET,
} from "../actionTypes/cartActionTypes";
import Axios from "axios";
import Cookie from 'js-cookie'

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({type: ADD_ITEM, payload : {
      product: data._id,
      name: data.title,
      image: data.image,
      price: data.price,
      qtyInStock : data.qtyInStock, 
      qty
    }});
    const { cart:{cartItems}} =getState()
    Cookie.set("cartItems", JSON.stringify(cartItems))
  } catch (error) {}
};

const removeItem = (productId) => async (dispatch, getState) => {
  //remove from redux
  dispatch({ type: REMOVE_ITEM, payload: productId });

  const { cart:{cartItems}} =getState()
    Cookie.set("cartItems", JSON.stringify(cartItems))
};

//shipping

const saveShippingDetails = (shippingInfo) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_DET, payload: shippingInfo });
};

//save payment details

const savePaymentDetails = (paymentInfo) => async (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_DET, payload: paymentInfo });
};

export { addToCart, removeItem, saveShippingDetails, savePaymentDetails };
