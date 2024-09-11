import {CartItemContainer, ItemDetails, Name} from "./cart-item.styles.jsx";

const CartItem = ({item}) => {
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
}

export default CartItem;