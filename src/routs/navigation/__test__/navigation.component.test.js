import { fireEvent, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";

jest.mock('react-redux', () => ({ 
    ...jest.requireActual('react-redux'), 
    useDispatch: jest.fn(), 
}));

describe("Navigation tests", () => {

    let mockDispatch; 
    beforeEach(() => { 
        mockDispatch = jest.fn(); 
        reactRedux.useDispatch.mockReturnValue(mockDispatch); 
    })

    test("Should render signin link and not signout link if no current user is not present", () => {
        renderWithProviders(<Navigation />, 
            {
                preloadedState:{
                    user: {
                        currentUser: null,
                    },
                },
            }
        )

        const signoutLinkElement = screen.queryByText(/sign out/i);
        expect(signoutLinkElement).toBeNull();

        const signinLinkElement = screen.getByText(/sign in/i);
        expect(signinLinkElement).toBeInTheDocument();
    })

    test("Should render signou link and not sign in link when user is present", () => {
        renderWithProviders(<Navigation />, 
            {
                preloadedState: {
                    user: {
                        currentUser: {},
                    },
                },
            }
        )

        const signinLinkElement = screen.queryByText(/sign in/i);
        expect(signinLinkElement).toBeNull();

        const signoutLinkElement = screen.getByText(/sign out/i);
        expect(signoutLinkElement).toBeInTheDocument();
    })

    test("should render cart dropdown when isOpen is true", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                },
            },
        });

        const cartDropdownElement = screen.getByText(/your cart is empty/i);
        expect(cartDropdownElement).toBeInTheDocument();
    })

    test("should not render cart dropdown when isOpen is false", () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: [],
                },
            },
        });

        const cartDropdownElement = screen.queryByText(/your cart is empty/i);
        expect(cartDropdownElement).toBeNull();
    })

    test("should dispatch signOutStartAction when signout is clicked", async () => {

        renderWithProviders(<Navigation />, {
                preloadedState: {
                    user: {
                        currentUser: {},
                    },
                },
            })

        const signoutLinkElement = screen.getByText(/sign out/i);
        expect(signoutLinkElement).toBeInTheDocument();

        await fireEvent.click(signoutLinkElement);

        expect(mockDispatch).toHaveBeenCalled();

        const signOutStartAction = signOutStart();
        expect(mockDispatch).toHaveBeenCalledWith(signOutStartAction);

        mockDispatch.mockClear();
    })

})