import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon tests", () => {
    test("uses preloaded state to render", () => {
        const intialCartItems = [
            {id: 1, name: "Item A", imageUrl: "test", price: 10, quantity: 3},
        ];

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: intialCartItems,
                },
            },
        });

        const cartIconElement = screen.getByText("3");
        expect(cartIconElement).toBeInTheDocument();
    })
})