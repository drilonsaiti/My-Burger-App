import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    orders: [],
    loading: false,
    purchased: false,
}
const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: [...state.orders,
                    {
                        id: action.orderId,
                        ...action.orderData
                    }
                ]
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default reducer;