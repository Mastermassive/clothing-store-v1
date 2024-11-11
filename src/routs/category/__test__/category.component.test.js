import {screen} from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Category from "../category.component";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        category: "mens",
    }),
}));

describe("Category component tests", () => {
    test("should render spinner when is loading is true", () => {
        renderWithProviders(<Category/>, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: [],
                }
            }
        })

        const spinnerElement = screen.getByTestId("s");
        expect(spinnerElement).toBeInTheDocument();
    });

    test("should render category when is loading is false", () => {
        renderWithProviders(<Category/>, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [
                        {
                            title: "mens",
                            items: [
                                {id: 1, name: "product 1"},
                                {id: 2, name: "product 2"},
                            ]
                        }
                    ],
                }
            }
        })

        const spinnerElement = screen.queryByTestId("s");
        expect(spinnerElement).toBeNull();

        const product1Element = screen.getByText(/product 1/i);
        expect(product1Element).toBeInTheDocument();
    });
})