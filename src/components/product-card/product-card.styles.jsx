import styled from "styled-components";
import Button from "../button/button.component";

export const StyledButton = styled(Button)`
    width: 80%; 
    opacity: 0.7; 
    position: absolute; 
    top: 255px; 
    display: none;
    &:hover{
       opacity: 0.85;
    } 

    @media screen and (max-width: 800px) {
        display: block;
        width: 90%;
        opacity: 0.9;
        min-width: unset;
        padding: 0px 10px;

        &:hover{
            opacity: unset;
        }
    }
`
export const ProductCardContainer = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    height: 350px; 
    align-items: center; 
    position: relative; 
    &:hover ${StyledButton} {
        display: flex;
    }

    @media screen and (max-width: 800px) {
        width: 40vw;
    }

    @media screen and (max-width: 400px) {
        width: 80vw;
    }
`
export const StyledImg = styled.img`
    width: 100%; 
    height: 95%; 
    object-fit: cover; 
    margin-bottom: 5px;
    &:hover { 
        opacity: 0.8; 
    }
    @media screen and (max-width: 800px) {
        &:hover {
            opacity: unset;
        }
    }
`
export const FooterContainer = styled.div`
    width: 100%; 
    height: 5%; 
    display: flex; 
    justify-content: space-between; 
    font-size: 18px; 
`
export const SpanName = styled.span`
    width: 90%; 
    margin-bottom: 15px; 
`
export const SpanPrice = styled.span`
    width: 15%; 
`


// .product-card-container { 
//     width: 100%; 
//     display: flex; 
//     flex-direction: column; 
//     height: 350px; 
//     align-items: center; 
//     position: relative; 
//     img { 
//         width: 100%; 
//         height: 95%; 
//         object-fit: cover; 
//         margin-bottom: 5px; 
//     } 
//     button { 
//         width: 80%; 
//         opacity: 0.7; 
//         position: absolute; 
//         top: 255px; display: none; 
//     } 
//     &:hover { 
//         img { 
//             opacity: 0.8; 
//         } 
//         button { 
//             opacity: 0.85; 
//             display: flex; 
//         } 
//     } 
//     .footer { 
//         width: 100%; 
//         height: 5%; 
//         display: flex; 
//         justify-content: space-between; 
//         font-size: 18px; 
//         .name { 
//             width: 90%; 
//             margin-bottom: 15px; 
//         } .price { 
//             width: 15%; 
//         } 
//     } 
// }