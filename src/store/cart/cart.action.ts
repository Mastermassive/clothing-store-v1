import { CategoryItem } from "../categories/category.types";
import { CartActionTypes, CartItem } from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducers/reducers.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = ( cartItems:CartItem[], cartItemToRemove: CartItem): CartItem[] => {

    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    if(existingCartItem && existingCartItem.quantity === 1 ) {
        return cartItems.filter((item) => item.id !== existingCartItem.id)
    }
    return cartItems.map((item) => 
        (item.id === cartItemToRemove.id) 
        ? {...item, quantity: item.quantity-1}
        : item
    )
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id)
}


export type SetIsCartOpen = ActionWithPayload<CartActionTypes.SET_IS_CART_OPEN, Boolean>;

export type SetCartItems = ActionWithPayload<CartActionTypes.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher(
    (bool: Boolean): SetIsCartOpen => {
        return createAction(CartActionTypes.SET_IS_CART_OPEN, bool);
    }
)

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems => {
        return createAction(CartActionTypes.SET_CART_ITEMS, cartItems);
    }
)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}
export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}
export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
}