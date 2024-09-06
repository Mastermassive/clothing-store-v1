import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map((item) => 
            (item.id === productToAdd.id) 
            ? {...item, quantity: item.quantity+1}
            : item
        )
    }
   
    
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemsCount: 0,
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem. quantity, 0);
        setCartItemsCount(newCartCount);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd, setCartItemsCount, cartItemsCount))
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemsCount, setCartItemsCount};
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}