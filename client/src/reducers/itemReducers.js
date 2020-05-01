import {
  PULL_ITEMS,
  PULL_ITEMS_SUCCESS,
  PULL_ITEMS_FAILED,
  ITEM_DETAILS_PULL,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILED,
  SAVE_ITEM,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAILED,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILED,
} from "../actionTypes/itemActionTypes";

function itemListReducer(state = { etsyList: [], productsList: [] }, action) {
  // etsyList
  // loadData - api call
  //db
  //users can create new items to sell
  //Load products from db
  //Create product
  //delete product
  //update product

  switch (action.types) {
    case "LOAD_ETSY_DATA":
      //returned a list of objectf from
      return {
        ...state,
        etsyList: action.payload,
      };
    case "LOAD_PRODUCT_DATA":
      //returned from db
      return {
        ...state,
        productsList: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        productsList: state.productsList.concat(action.payload),
      };
    case "DELETE_PRODUCT":
      //payload action must be an id
      return {
        ...state,
        productsList: state.productsList.filter(
          (obj) => obj.id !== action.payload
        ),
      };

    case "UPDATE_PRODUCT":
      return state;
    default:
      return state;
  }
}

export { itemListReducer };

// function itemListReducer(state={items: []}, action){
//     switch(action.types){
//         case PULL_ITEMS:
//             return { loading:true, items:[]};
//         case PULL_ITEMS_SUCCESS:
//             return{ loading: false, items: action.payload}
//         case PULL_ITEMS_FAILED:
//             return{ loading:false, error:action.payload}
//         default:
//             return state
//     };
// }
// function itemDetailsReducer(state={items: {}}, action){
//     switch(action.types){
//         case ITEM_DETAILS_PULL:
//             return { loading:true };
//         case ITEM_DETAILS_SUCCESS:
//             return{ loading: false, items: action.payload}
//         case ITEM_DETAILS_FAILED:
//             return{ loading:false, error:action.payload}
//         default:
//             return state
//     };
// }
// function deleteItemReducer(state={items: {}}, action){
//     switch(action.types){
//         case DELETE_ITEM:
//             return { loading:true };
//         case DELETE_ITEM_SUCCESS:
//             return{ loading: false, items: action.payload, success: true}
//         case DELETE_ITEM_FAILED:
//             return{ loading: false, error:action.payload}
//         default:
//             return state
//     };
// }
// function saveItemReducer(state={items: {}}, action){
//     switch(action.types){
//         case SAVE_ITEM:
//             return { loading:true };
//         case SAVE_ITEM_SUCCESS:
//             return{ loading: false, items: action.payload, success: true}
//         case SAVE_ITEM_FAILED:
//             return{ loading: false, error:action.payload}
//         default:
//             return state
//     };
// }
// export { itemListReducer, saveItemReducer, deleteItemReducer, itemDetailsReducer}
