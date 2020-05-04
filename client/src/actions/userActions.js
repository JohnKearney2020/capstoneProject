import { USER_SIGNIN, SIGNIN_FAILED, SIGNIN_SUCCESS, REGISTER_USER, REGISTER_SUCCESS, REGISTER_FAILED } from "../actionTypes/userActionTypes"
import Axios from 'axios'
import Cookie from 'js-cookie'


const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN, payload: {email , password}});
    try {
        const { data } = await Axios.post("/api/users/signin", {email, password});
        dispatch({ type: SIGNIN_SUCCESS, payload : data});
        Cookie.set('userDetails', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: SIGNIN_FAILED, payload : error.message })
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: REGISTER_USER, payload: {name, email , password}});
    try {
        const { data } = await Axios.post("/api/users/register", {name, email, password});
        dispatch({ type: REGISTER_SUCCESS, payload : data});
        Cookie.set('userDetails', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: REGISTER_FAILED, payload : error.message })
    }
}

export {signin, register};