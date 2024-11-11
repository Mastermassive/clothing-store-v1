import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.component";

describe("Product Card tests", () => {
    test("should add item to cart when button is clicked", async () => {

        const mockProduct = {
            id: 1,
            name: "itemA",
            imageUrl: "test",
            price: 10,
        }

        const {store} = renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart:{
                    cartItems: [],
                },
            },
        })

        const addToCartButtonElement = screen.getByText(/add to cart/i);
        await fireEvent.click(addToCartButtonElement);

        expect(store.getState().cart.cartItems.length).toBe(1);
    })
})