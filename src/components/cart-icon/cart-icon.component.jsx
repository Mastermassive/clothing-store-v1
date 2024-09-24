import {CartIconContainer, ShoppingBagIcon, ItemCount} from "./cart-icon.styles.jsx";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsCount, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemsCount =  useSelector(selectCartItemsCount);
    const toggleIsCartOpen = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className="shopping-icon" />
            <ItemCount>{cartItemsCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;