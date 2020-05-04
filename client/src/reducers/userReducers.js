import { USER_SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED,
    UPDATE_USER,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
    REGISTER_USER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGOUT } from '../actionTypes/userActionTypes'


function signInReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN:
            return { loading: true };
        case SIGNIN_SUCCESS:
            return { loading : false, userDetails: action.payload}
        case SIGNIN_FAILED:
            return { loading : false, error : action.payload }
        case LOGOUT:
            return{}
        default:
            return state;
    };
}

function updateUserReducer(state = {}, action){
    switch(action.type){
        case UPDATE_USER:
            return { loading: true };
        case UPDATE_SUCCESS:
            return { loading : false, userDetails: action.payload}
        case UPDATE_FAILED:
            return { loading : false, error : action.payload }
        default:
            return state;
    };
}
function registerUserReducer(state = {}, action){
    switch(action.type){
        case REGISTER_USER:
            return { loading: true };
        case REGISTER_SUCCESS:
            return { loading : false, userDetails: action.payload}
        case REGISTER_FAILED:
            return { loading : false, error : action.payload }
        default:
            return state;
    };
}
export { signInReducer, updateUserReducer, registerUserReducer }