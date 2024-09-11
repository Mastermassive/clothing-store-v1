import {CartIconContainer, ShoppingBagIcon, ItemCount} from "./cart-icon.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItemsCount} = useContext(CartContext);
    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className="shopping-icon" />
            <ItemCount>{cartItemsCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;