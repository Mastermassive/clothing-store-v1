import {expectSaga, testSaga} from "redux-saga-test-plan";
import { call } from "typed-redux-saga/macro";
import { throwError } from 'redux-saga-test-plan/providers';
import { 
    fetchCategoriesAsync, 
    onFetchCategories, 
    categoriesSaga 
} from "../category.saga";
import { CategoriesActionTypes } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "../category.action";

describe("Category saga tests", () => {
    test("CategoriesSaga test", () => {
        testSaga(categoriesSaga)
        .next()
        .all([call(onFetchCategories)])
        .next()
        .isDone();
    })

    test('onFetchCategories should takeLatest FETCH_CATEGORIES_START and call fetchCategoriesAsync', () => {
        testSaga(onFetchCategories)
          .next()
          .takeLatest(
            CategoriesActionTypes.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
          )
          .next()
          .isDone();
      })

    test("fetchCategoriesAsync success", () => {
        const mockCategoriesArray = [
            {id: 1, name: "Category1"},
            {id: 2, name: "Category2"},
        ];

        return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
            .put(fetchCategoriesSuccess(mockCategoriesArray))
            .run();
    })

    test('fetchCategoriesAsync failure', () => {
        const error = new Error('An error occurred');

        return expectSaga(fetchCategoriesAsync)
          .provide([[call(getCategoriesAndDocuments), throwError(error)]])
          .put(fetchCategoriesFailed(error))
          .run();
      });
})