import { User } from "firebase/auth";
import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";
import { createAction , withMatcher, Action, ActionWithPayload} from "../../utils/reducers/reducers.utils";
import { UserActionTypes } from "./user.types";

export type CheckUserSession = Action<UserActionTypes.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<UserActionTypes.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
    UserActionTypes.EMAIL_SIGN_IN_START, 
    {email: string, password: string;}
>;

export type SignInSuccess = ActionWithPayload<UserActionTypes.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<UserActionTypes.SIGN_IN_FAILED, Error>;

export type SignUpStart = ActionWithPayload<
    UserActionTypes.SIGN_UP_START, 
    {email: string, password: string, displayName: string;}
>;

export type SignUpSuccess = ActionWithPayload<
    UserActionTypes.SIGN_UP_SUCCESS,
    {user: User, additionalDetails: AdditionalInfo;}
>;

export type SignUpFailed = ActionWithPayload<UserActionTypes.SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<UserActionTypes.SIGN_OUT_START>;

export type SignOutSuccess = Action<UserActionTypes.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<UserActionTypes.SIGN_OUT_FAILED, Error>;

export const checkUserSession = withMatcher((): CheckUserSession => {
    return createAction(UserActionTypes.CHECK_USER_SESSION);
})

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
    return createAction(UserActionTypes.GOOGLE_SIGN_IN_START);
})

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart => {
    return createAction(UserActionTypes.EMAIL_SIGN_IN_START, {email, password});
})

export const signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess => {
    return createAction(UserActionTypes.SIGN_IN_SUCCESS, user);
})

export const signInFailed = withMatcher((error: Error): SignInFailed => {
    return createAction(UserActionTypes.SIGN_IN_FAILED, error);
})

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => {
    return createAction(UserActionTypes.SIGN_UP_START, {
        email,
        password,
        displayName,
    });
})

export const signUpSuccess = withMatcher(
    (user: User, additionalDetails: AdditionalInfo): SignUpSuccess => {
    return createAction(UserActionTypes.SIGN_UP_SUCCESS, {
        user,
        additionalDetails
    });
})

export const signUpFailed = withMatcher((error: Error): SignUpFailed => {
    return createAction(UserActionTypes.SIGN_UP_FAILED, error);
})

export const signOutStart = withMatcher((): SignOutStart =>
    createAction(UserActionTypes.SIGN_OUT_START));
  
  export const signOutSuccess = withMatcher((): SignOutSuccess =>
    createAction(UserActionTypes.SIGN_OUT_SUCCESS));
  
  export const signOutFailed = withMatcher((error: Error): SignOutFailed =>
    createAction(UserActionTypes.SIGN_OUT_FAILED, error));