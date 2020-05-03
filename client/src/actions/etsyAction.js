import axios from 'axios'
import Cookie from "js-cookie";
import {
    LIST_ETSY_PRODUCTS,
    LIST_ETSY_FAILED
} from "../actionTypes/etsyActionType";


export const getEtsyItems = () => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };
   
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

        
        dispatch({
            type: LIST_ETSY_PRODUCTS,
            payload: res.data
        });
       
    } catch (err) {
      
        if (err) {
            dispatch({
                type: LIST_ETSY_FAILED,
                errors:err
            });
        }
        
    }
};
