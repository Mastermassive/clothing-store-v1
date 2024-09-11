import {
    CheckoutItemContainer, 
    ImageContainer, 
    Name, 
    Price, 
    QuantityContainer, 
    Quantity,
    Arrow,
    RemoveButton,
} from "./checkout-item.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({item}) => {
    const {name, quantity, imageUrl, price} = item
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemFromCart(item);
    const clearItemHandler = () => clearItemFromCart(item,);

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