import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducers/reducers.utils";
import {onAuthStateChangedListener, getUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserActionTypes = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state, action) => {
    console.log("dispatch");
    console.log(action);
    const {type, payload} = action;
    switch (type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
    
        default:
            throw new Error(`Unhandled error ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
}

export const UserProvider = ({children}) => {
    const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(UserActionTypes.SET_CURRENT_USER, user))
    }
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                getUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}