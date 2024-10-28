import { CategoriesActionTypes, Category } from "./category.types";
import {
    createAction, 
    Action, 
    ActionWithPayload, 
    withMatcher,
} from "../../utils/reducers/reducers.utils";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) => {
//     return createAction(CategoriesActionTypes.SET_CATEGORIES, categoriesArray);
// }

export type FetchCategoriesStart = 
    Action<CategoriesActionTypes.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = 
    ActionWithPayload<
    CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, 
    Category[]
    >;

export type FetchCategoriesFailed = 
    ActionWithPayload<
    CategoriesActionTypes.FETCH_CATEGORIES_FAILED, 
    Error
    >;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
    return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher((
    categoriesArray: Category[]
): FetchCategoriesSuccess => {
    return createAction(
        CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, 
        categoriesArray
    );
})

export const fetchCategoriesFailed = withMatcher((
    error: Error
): FetchCategoriesFailed => {
    return createAction(
        CategoriesActionTypes.FETCH_CATEGORIES_FAILED, 
        error
    );
})

// export const fetchCategoriesAsync = () => async(dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// }