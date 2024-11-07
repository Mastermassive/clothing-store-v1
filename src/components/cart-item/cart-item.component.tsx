import { FC, memo } from "react";
import {CartItemContainer, ItemDetails, Name} from "./cart-item.styles";
import { CartItem as TCartItem } from "../../store/cart/cart.types";

type CartItemProps = { 
    item: TCartItem;
}

const CartItem: FC<CartItemProps> = memo(({item}) => {
    const {name, imageUrl, price, quantity} = item;
    return(
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <span >{quantity} X ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
});

export default CartItem;