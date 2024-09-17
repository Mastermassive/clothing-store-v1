import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import {useSelector} from "react-redux";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {
    NavigationContainer, 
    LogoContainer, 
    NavLinks, 
    StyledLink, 
    StyledSpan
} from './navigation.styles';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";


const Navigation = () => {
   const currentUser = useSelector((state) => state.user.currentUser);
    const {isCartOpen} = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrownLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <StyledLink to="/shop">
                    SHOP
                </StyledLink>
                {
                    currentUser ? (
                        <StyledSpan className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </StyledSpan>
                    ) : (
                        <StyledLink  to="/auth">
                            SIGN IN
                        </StyledLink>
                    )
                }
                    <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;