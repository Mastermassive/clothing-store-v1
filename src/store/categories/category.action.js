import { CategoriesActionTypes } from "./category.types";
import {createAction} from "../../utils/reducers/reducers.utils";

export const setCategories = (categoriesArrays) => {
    return createAction(CategoriesActionTypes.SET_CATEGORIES, categoriesArrays);
}