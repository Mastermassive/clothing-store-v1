import { CartActionTypes } from "./cart.types";
import { createAction } from "../../utils/reducers/reducers.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((item) => 
            (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1}
            : item
        )
    }
   
    
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = ( cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    if(existingCartItem.quantity === 1 ) {
        return cartItems.filter((item) => item.id !== existingCartItem.id)
    }
    return cartItems.map((item) => 
        (item.id === existingCartItem.id) 
        ? {...item, quantity: item.quantity-1}
        : item
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id)
}


export const setIsCartOpen = (bool) => {
   return createAction(CartActionTypes.SET_IS_CART_OPEN, bool);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}
export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CartActionTypes.SET_CART_ITEMS, newCartItems);
}