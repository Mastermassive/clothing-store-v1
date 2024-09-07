import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartItemsTotal, setCartItemsTotal] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartItemsCount(newCartCount);
    },[cartItems])

    useEffect(() => {
        // eslint-disable-next-line
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setCartItemsTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
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