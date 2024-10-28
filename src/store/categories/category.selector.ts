import {createSelector} from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategoriesSlice = 
    createSelector(
        [selectCategoriesReducer],
        (categoriesSlice) => categoriesSlice.categories
    )

export const selectCategoriesMap = 
    createSelector(
        [selectCategoriesSlice],
        (categories): CategoryMap => categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{} as CategoryMap)
    )

export const selectCategoriesIsLoading = 
    createSelector(
        [selectCategoriesReducer],
        (categoriesSlice) => categoriesSlice.isLoading
    )



// export const selectCategoriesMap = (state) => {
//     return state.categories.categories
//     .reduce((acc, category) => {
//         const {title, items} = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     },{});
// }
    