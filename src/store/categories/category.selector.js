import {createSelector} from "reselect";

const selectCategoriesReducer = (state) => state.categories;

export const selectCategoriesSlice = 
    createSelector(
        [selectCategoriesReducer],
        (categoriesSlice) => categoriesSlice.categories
    )

export const selectCategoriesMap = 
    createSelector(
        [selectCategoriesSlice],
        (categories) => categories.reduce((acc, category) => {
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{})
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
    