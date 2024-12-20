import { AnyAction } from "redux-saga";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
    readonly isCartOpen: Boolean;
    readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (
    state=CART_INITIAL_STATE, 
    action: AnyAction
) => {

    if(setIsCartOpen.match(action)) {
        return {...state, isCartOpen: action.payload, }
    }

    if(setCartItems.match(action)) {
        return {...state, cartItems: action.payload, }
    }

    return state;
}

