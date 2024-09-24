import { CartActionTypes } from "./cart.types";

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (state=CART_INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch (type) {
        case CartActionTypes.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CartActionTypes.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        default:
            return state;
    }
}

