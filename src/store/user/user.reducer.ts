import { AnyAction } from "redux-saga";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutStart, signUpFailed } from "./user.action";
export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: Boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
) => {
    if(signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
        }
    }
    if(signOutStart.match(action)) {
        return {
            ...state,
            currentUser: null,
        }
    }
    if(
        signOutFailed.match(action) 
        || signInFailed.match(action) 
        || signUpFailed.match(action)
    ) {
        return {
            ...state,
            error: action.payload,
        }
    }

    return state;
}