import {ProductCardContainer, StyledImg, StyledButton, FooterContainer, SpanName, SpanPrice} from "./product-card.styles";

import {BUTTON_TYPE_CLASSES} from "../button/button.component";

import { addItemToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const {name, imageUrl, price} = product;
    const cartItems = useSelector(selectCartItems);
    const addToCart = () => dispatch(addItemToCart(cartItems, product));
    return(
        <ProductCardContainer>
            <StyledImg src={imageUrl} alt={`${name}`}/>
            <FooterContainer>
                <SpanName>{name}</SpanName>
                <SpanPrice>${price}</SpanPrice>
            </FooterContainer>
            <StyledButton 
            buttonType={BUTTON_TYPE_CLASSES.inverted} 
            onClick={addToCart}
            >
                Add to cart
            </StyledButton>
        </ProductCardContainer>
    )
}

export default ProductCard;