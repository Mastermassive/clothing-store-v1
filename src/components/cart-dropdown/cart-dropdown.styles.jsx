import styled from "styled-components";
import { InvertedButton, GoogleSignInButton, BaseButton } from "../button/button.styles";

export const CartDropdownContainer = styled.div`
    position: absolute; 
    width: 260px; //240px
    height: 340px; 
    display: flex; 
    flex-direction: column; 
    padding: 20px; 
    border: 1px solid black; 
    background-color: white; 
    top: 90px; 
    right: 40px; 
    z-index: 5; 
    ${InvertedButton},${GoogleSignInButton},${BaseButton} {
        margin-top: auto;
    }
`
export const EmptyMessage = styled.span`
    font-size: 18px; 
    margin: 50px auto;
`
export const CartItemsContainer = styled.div`
    height: 240px; 
    display: flex; 
    flex-direction: column; 
    overflow: scroll; 
`
