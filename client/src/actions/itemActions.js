import { PULL_ITEMS, PULL_ITEMS_SUCCESS, PULL_ITEMS_FAILED, ITEM_DETAILS_PULL, ITEM_DETAILS_SUCCESS, ITEM_DETAILS_FAILED, SAVE_ITEM, SAVE_ITEM_SUCCESS } from "../actionTypes/itemActionTypes"
import axios from 'axios'
import store from '../store'

const listItems  = () => async (dispatch) =>{
    try {
            dispatch({type: PULL_ITEMS});
            const {data} = await axios.get("/api/products");
            dispatch({type: PULL_ITEMS_SUCCESS, payload:data})
    }catch(error){
            dispatch({type:PULL_ITEMS_FAILED, payload: error.message})
    }
    
}
const detailsItem = (productId) => async (dispatch) =>{
        try {
                dispatch({type:ITEM_DETAILS_PULL, payload: productId});
                // const {data} = await axios.get("/api/products/" + productId);
                let etsyItem = store.getState().etsyReducer.etsy.items.results.filter(itemObj => {
                        return itemObj.listing_id == productId
                })
                console.log(store.getState().etsyReducer.etsy.items.results)

                if (etsyItem.length > 0) dispatch({ type: ITEM_DETAILS_SUCCESS, payload: etsyItem[0]});
                else {
                        const {data} = await axios.get("/api/products/" + productId);
                        dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data})
                }
        } catch (error) {
                dispatch({type: ITEM_DETAILS_FAILED, payload : error.message})
        }
}
const saveItem = (product) => async (dispatch, getState) =>{
        try {
                dispatch({ type : SAVE_ITEM, payload: product})
                const { userSignIn : {userDetails}} = getState()
                const { data } = await axios.post('/api/products', product, {
                headers : {
                        'Authorization' : 'Bearer' + userDetails.token
                }})
                dispatch({ type: SAVE_ITEM_SUCCESS, payload : data})
        } catch (error) {
                
        }
}



export { listItems, detailsItem }