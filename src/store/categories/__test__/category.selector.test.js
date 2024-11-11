import { 
    selectCategoriesSlice, 
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from "../category.selector";

const mockState = {
    categories: {
        isLoading: false,
        categories: [
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
    }
}

describe("Category selector tests", () => {
    test("selectCategoriesSlice should return the categories data", () => {
        const categoriesSlice = selectCategoriesSlice(mockState);
        expect(categoriesSlice).toEqual(mockState.categories.categories);
    })

    test("selectCategoriesIsLoading should return the isLoading state", () => {
        const isLoading = selectCategoriesIsLoading(mockState);
        expect(isLoading).toEqual(false);
    })

    test("selectCategoriesMap should return categoriesMap", () => {
        const expectedCategoriesMap = {
            mens : [
                {id: 1, name: "item 1"},
                {id: 2, name: "item 2"},
            ],
            womens : [
                {id: 1, name: "item 1"},
                {id: 2, name: "item 2"},
            ]
        }

        const categoriesMap = selectCategoriesMap(mockState);
        expect(categoriesMap).toEqual(expectedCategoriesMap);
    })
})