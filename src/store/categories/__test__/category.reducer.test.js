import { 
    CATEGORIES_INITIAL_STATE, 
    categoriesReducer
} from "../category.reducer";

import { 
    fetchCategoriesStart, 
    fetchCategoriesFailed, 
    fetchCategoriesSuccess
} from "../category.action";

describe("Category reducer tests", () => {
    test("fetchCategoriesStart", () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true,
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
        ).toEqual(expectedState);
    })

    test("fetchCategoriesSuccess", () => {

        const mockData = [
            {
                title: "mens",
                imageUrl: "test",
                items: [
                    {id: 1, name: "item 1"},
                    {id: 2, name: "item 2"}
                ],
            },
            {
                title: "womens",
                imageUrl: "test",
                items: [
                    {id: 1, name: "item 1"},
                    {id: 2, name: "item 2"}
                ],
            },
        ]

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData,
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))
        ).toEqual(expectedState);
    })

    test("fetch categories failed", () => {
        const mockError = new Error("Error fetching categories");

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError,
        }

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))
        ).toEqual(expectedState);
    })
})