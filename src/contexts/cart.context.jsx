import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartItemsTotal: 0,
})

export const CartActionTypes = {
    TOGGLE_CART: "TOGGLE-CART",
    SET_CART_ITEMS: "SET_CART_ITEMS",
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case CartActionTypes.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CartActionTypes.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error(`Unhandled error ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemsCount: 0,
    cartItemsTotal: 0,
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartItemsCount, cartItemsTotal} = state;
    const setIsCartOpen = (bool) => {
        dispatch(createAction(CartActionTypes.TOGGLE_CART, bool));
    }
    
    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        dispatch(createAction(
            CartActionTypes.SET_CART_ITEMS, 
            {
                cartItems: newCartItems,
                cartItemsCount: newCartCount,
                cartItemsTotal: newCartTotal,
            } 
        ))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartItemsCount, 
        cartItemsTotal,
        removeItemFromCart,
        clearItemFromCart,
    };
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}