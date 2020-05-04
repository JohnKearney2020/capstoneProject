import { CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    ORDER_DETAILS,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED,
    USER_ORDER_LIST,
    USER_ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_FAILED,
    ORDER_LIST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILED,
    PAY_ORDER,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAILED,
    DELETE_ORDER,
    DELETE_ORDER_SUCCESS,
    ORDER_DELETE_FAILED,

} from '../actionTypes/orderActionType';

function createOrderReducer(state = {}, action) {
    switch(action.types) {
        case CREATE_ORDER:
            return { loading : true}
        case CREATE_ORDER_SUCCESS:
            return { loading: false, order : action.payload, success: true }
        case CREATE_ORDER_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}
function orderDetailsReducer(state = { order : { orderItems: [], shipping: [], payment: [] }}, action) {
    switch(action.types) {
        case ORDER_DETAILS:
            return { loading : true}
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order : action.payload}
        case ORDER_DETAILS_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}
function userOrderReducer(state = { orders : []}, action) {
    switch(action.types) {
        case USER_ORDER_LIST:
            return { loading : true}
        case USER_ORDER_LIST_SUCCESS:
            return { loading: false, order : action.payload}
        case USER_ORDER_LIST_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}
function orderListReducer(state = { orders : []}, action) {
    switch(action.types) {
        case ORDER_LIST:
            return { loading : true}
        case ORDER_LIST_SUCCESS:
            return { loading: false, order : action.payload}
        case ORDER_LIST_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}
function payOrderReducer(state = { order : { orderItems: [], shipping: [], payment: [] } }, action) {
    switch(action.types) {
        case PAY_ORDER:
            return { loading : true}
        case PAY_ORDER_SUCCESS:
            return { loading: false, success: true}
        case PAY_ORDER_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}
function deleteOrderReducer(state = { order : { orderItems: [], shipping: [], payment: [] } }, action) {
    switch(action.types) {
        case DELETE_ORDER:
            return { loading : true}
        case DELETE_ORDER_SUCCESS:
            return { loading: false, success: true}
        case ORDER_DELETE_FAILED:
            return {loading : false, error : action.payload};
        default: 
            return state;
    }
}

export { createOrderReducer,
    orderDetailsReducer,
    userOrderReducer, 
    orderListReducer, payOrderReducer, deleteOrderReducer }