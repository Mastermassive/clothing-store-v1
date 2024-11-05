import {
    CheckoutItemContainer, 
    ImageContainer, 
    Name, 
    Price, 
    QuantityContainer, 
    Quantity,
    Arrow,
    RemoveButton,
} from "./checkout-item.styles";

import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";
import { FC } from "react";

type CheckoutItemProps = {
    item: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({item}) => {
    const dispatch = useDispatch();
    const {name, quantity, imageUrl, price} = item;
    const cartItems = useSelector(selectCartItems);

    const addItemHandler = () => dispatch(addItemToCart(cartItems, item));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));

    return(

        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <QuantityContainer>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Quantity>{quantity}</Quantity>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </QuantityContainer>
            <Price>${price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;