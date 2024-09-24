import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from "./checkout.styles";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { useSelector } from "react-redux";
import { selectCartItems, selectCartItemsTotal } from "../../store/cart/cart.selector";



const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartItemsTotal = useSelector(selectCartItemsTotal);

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
                {cartItems.map(item => 
                    <CheckoutItem key={item.id} item={item} /> 
                )}
            <Total>Total: ${cartItemsTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;