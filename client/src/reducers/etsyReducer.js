import {
    LIST_ETSY_PRODUCTS,
    LIST_ETSY_FAILED
} from "../actionTypes/etsyActionType";
function etsyReducer(
    //{id, qty, title, descrpiton, price, imgURL}
    state = { etsy: {items:[],message:""} },
    action
  ) {
    switch (action.type) {
      case LIST_ETSY_PRODUCTS:
        return {
          ...state,
          etsy: { // removed second etsy object that was wrapped around?? see below 
            items:action.payload,
            message:"success"
          },
        };
       case  LIST_ETSY_FAILED:
        return {
          ...state,
          etsy: {etsy: {items:[],message:action.errors}},
        };
      default:
        return state;
    }
  }
  export { etsyReducer };