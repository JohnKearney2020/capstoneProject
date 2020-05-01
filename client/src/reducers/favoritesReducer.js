function favoritesReducer(state = { etsyList: [], productsList: [] }, action) {
  //user can add to a fav. list and remove from a fav. list

  switch (action.type) {
    case "ADD_ETSY_FAV":
      return {
        ...state,
        etsyList: state.etsyList.concat(action.payload),
      };
    case "DELETE_ETSY_FAV":
      //action.payload = id
      return {
        ...state,
        etsyList: state.etsyList.filter((obj) => obj.id !== action.payload),
      };
    case "ADD_PROD_FAV":
      return {
        ...state,
        etsyList: state.productsList.concat(action.payload),
      };
    case "DELETE_PROD_FAV":
      //action.payload = id
      return {
        ...state,
        etsyList: state.productsList.filter((obj) => obj.id !== action.payload),
      };
    default:
      return state;
  }
}

export { favoritesReducer };
