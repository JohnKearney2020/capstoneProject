
import Cookie from "js-cookie";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  SAVE_SHIPPING_DET,
  SAVE_PAYMENT_DET,
} from "../actionTypes/cartActionTypes";

const addToCart = (cartObject) => async (dispatch) => {
  try {
    //send product/etsy object
    // {id, name, description, price, imge}

    console.log("action data: ", cartObject);
    dispatch({
      type: ADD_ITEM,
      payload: cartObject,
    });
  } catch (error) {}
};

const removeItem = (cartId) => async (dispatch) => {
  //remove from redux
  dispatch({ type: REMOVE_ITEM, payload: cartId });
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
