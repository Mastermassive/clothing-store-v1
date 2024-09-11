import {ProductCardContainer, StyledImg, StyledButton, FooterContainer, SpanName, SpanPrice} from "./product-card.styles";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {BUTTON_TYPE_CLASSES} from "../button/button.component";



const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext);
    const addToCart = () => addItemToCart(product);
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