import {
  ADD_ITEM,
  REMOVE_ITEM,
  SAVE_SHIPPING_DET,
  SAVE_PAYMENT_DET,
} from "../actionTypes/cartActionTypes";

function cartReducer(
  //{id, qty, title, descrpiton, price, imgURL}
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
      };
    
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        shipping: {},
        payment: {},
      };
    case SAVE_SHIPPING_DET:
      return { ...state, shipping: action.payload };
    case SAVE_PAYMENT_DET:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}
export { cartReducer };


