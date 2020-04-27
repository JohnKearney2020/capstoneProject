import { PROMO_CODE } from '../actions/types'

const intitialState = {
    open : false,
    value : ''
}

export default function(state = intitialState, action){
    switch(action.type) {
        case PROMO_CODE : 
        return {
            ...state, 
            value : action.payload
        }
        default: 
        return state;
    }
}