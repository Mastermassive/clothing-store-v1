import { createAction } from "../../utils/reducers/reducers.utils";
import { UserActionTypes } from "./user.types";


export const checkUserSession = () => {
    return createAction(UserActionTypes.CHECK_USER_SESSION);
}

export const googleSignInStart = () => {
    return createAction(UserActionTypes.GOOGLE_SIGN_IN_START);
}

export const emailSignInStart = (email, password) => {
    return createAction(UserActionTypes.EMAIL_SIGN_IN_START, {email, password});
}

export const signInSuccess = (user) => {
    return createAction(UserActionTypes.SIGN_IN_SUCCESS, user);
}

export const signInFailed = (error) => {
    return createAction(UserActionTypes.SIGN_IN_FAILED, error);
}

export const signUpStart = (email, password, dispalyName) => {
    return createAction(UserActionTypes.SIGN_UP_FAILED, {
        email,
        password,
        dispalyName,
    });
}

export const signUpSuccess = (user, additionalDetails) => {
    return createAction(UserActionTypes.SIGN_UP_SUCCESS, {
        user,
        additionalDetails
    });
}

export const signUpFailed = (error) => {
    return createAction(UserActionTypes.SIGN_IN_FAILED, error);
}