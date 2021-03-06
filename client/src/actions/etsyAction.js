import {
    LIST_ETSY_PRODUCTS,
    LIST_ETSY_FAILED
} from "../actionTypes/etsyActionType";




export const getEtsyItems = () => dispatch => {

    // console.log("=====LOOKING FOR ITEMS IN API CALL=====")
  
      
    fetch("https://community-etsy.p.rapidapi.com/listings/active?api_key=w4mv8soose78gb7bu5lup3k7&limit=12&includes=MainImage", {
    "method": "GET",
    "headers": {
    "x-rapidapi-host": "community-etsy.p.rapidapi.com",
    "x-rapidapi-key": "40aa3bf7aamsh5fe0a3fc95f0f0cp1598ddjsn42fb7f9067d4"
    }
})
   
    .then(res=>{
        // console.log("FOUND ITEMS IN API CALL")
            return res.json()
        }).then(data=>{
            // console.log("returning data.results from redux actions")
            // console.log(data.results)
            
            dispatch({
                type: LIST_ETSY_PRODUCTS,
                payload: data
            });
            }).catch (err=>{
                if (err) {
                    dispatch({
                        type: LIST_ETSY_FAILED,
                        errors:err
                    });
                }
            })
};