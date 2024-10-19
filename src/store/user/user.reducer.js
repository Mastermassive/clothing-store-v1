import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
            }
        case UserActionTypes.SIGN_OUT_FAILED:
        case UserActionTypes.SIGN_IN_FAILED:
        case UserActionTypes.SIGN_UP_FAILED:
            return {
                ...state,
                error: payload,
            }
    
        default:
            return state;
    }
}