import {CartDropdownContainer, CartItemsContainer, EmptyMessage} from "./cart-dropdown.styles.jsx";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map((item) => {
                        return <CartItem key={item.id} item={item} /> 
                    })
                ) : (
                    <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )}
                
            </CartItemsContainer>
                <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;