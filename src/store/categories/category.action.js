import { CategoriesActionTypes } from "./category.types";
import {createAction} from "../../utils/reducers/reducers.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) => {
//     return createAction(CategoriesActionTypes.SET_CATEGORIES, categoriesArray);
// }

export const fetchCategoriesStart = () => {
    return createAction(CategoriesActionTypes.FETCH_CATEGORIES_START);
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return createAction(CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS, categoriesArray);
}

export const fetchCategoriesFailed = (error) => {
    return createAction(CategoriesActionTypes.FETCH_CATEGORIES_FAILED, error);
}

export const fetchCategoriesAsync = () => async(dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}