import styled from "styled-components";

export const AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;
    @media screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 50px;
    }
`

// .authentication-container {
//     display: flex;
//     width: 900px;
//     justify-content: space-between;
//     margin: 30px auto;
// }