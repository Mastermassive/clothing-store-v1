import { CategoriesActionTypes } from "./category.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state=INITIAL_STATE, action={}) => {
    const {type, payload} = action;

    switch (type) {
        case CategoriesActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            }

        case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false,
            }
            case CategoriesActionTypes.FETCH_CATEGORIES_FAILED:
                return {
                    ...state,
                    error: payload,
                    isLoading: false,
                }
        default:
            return state;
    }
}