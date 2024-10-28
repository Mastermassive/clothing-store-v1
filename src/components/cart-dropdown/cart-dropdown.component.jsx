import {
    CartDropdownContainer, 
    CartItemsContainer, 
    EmptyMessage
} from "./cart-dropdown.styles";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
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