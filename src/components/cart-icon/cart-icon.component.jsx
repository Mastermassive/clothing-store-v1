import "./cart-icon.styles.scss";
import {ReactComponent as ShoppingBagIcon} from "../../assets/shopping-bag.svg"
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartItemsCount} = useContext(CartContext);
    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }
    return(
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{cartItemsCount}</span>
        </div>
    )
}

export default CartIcon;