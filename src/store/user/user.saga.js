import { takeLatest, all, call, put } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";

import { 
    signInSuccess, 
    signInFailed, 
    signUpSuccess, 
    signUpFailed, 
    signOutFailed,
    signOutSuccess,
} from "./user.action";

import { 
    createAuthUserWithEmailAndPassword, 
    getCurrentUser, 
    getUserDocumentFromAuth, 
    signInUserWithEmailAndPassword, 
    signInWithGooglePopup, 
    signOutUser, 
} from "../../utils/firebase/firebase.utils";

// export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
//     try {
//         const userSnapshot = yield call(getUserDocumentFromAuth, userAuth, additionalDetails);
//         yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
//     } catch (error) {
//         console.log(error);
//         yield put(signInFailed(error));
//     }
// }

// export function* signInAfterSignUp({ payload: {user, additionalDetails}}) {
//     yield call(getSnapshotFromUserAuth, user, additionalDetails)
// }

// export function* signUp({ payload: {email, password, displayName}}) {
//     try {
//         const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
//         yield put(signUpSuccess(user, {displayName}));
//     } catch(error) {
//         console.log(error);
//         yield put(signUpFailed(error))
//     }
// }

// export function* signInWithEmail({ payload: {email, password} }) {
//     try {
//         const {user} = yield call(signInUserWithEmailAndPassword, email, password);
//         yield call(getSnapshotFromUserAuth, user);
//     } catch(error) {
//         // if(error.code==="auth/invalid-credential"){
//         //     alert("wrong username or password");
//         // }
//         yield put(signInFailed(error));
//     }
// }

// export function* signInWithGoogle() {
//     try {
//         const {user} = yield call(signInWithGooglePopup);
//         yield call(getSnapshotFromUserAuth, user);
//     } catch(error) {
//         yield put(signInFailed(error));
//     }
// }

// export function* isUserAuthenticated() {
//     try {
//         const userAuth = yield call(getCurrentUser);
//         if(!userAuth) return;
//         yield call(getSnapshotFromUserAuth, userAuth);
//     } catch (error) {
//         yield put(signInFailed(error));
//     }
// }

// export function* onSignUpSuccess() {
//     yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, signInAfterSignUp)
// }

// export function* onSignUpStart() {
//     yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
// }

// export function* onEmailSignInStart() {
//     yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
// }

// export function* onGoogleSignInStart() {
//     yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
// }

// export function* onCheckUserSession() {
//     yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
// }

// export function* userSagas() {
//     yield all([
//         call(onCheckUserSession), 
//         call(onGoogleSignInStart), 
//         call(onEmailSignInStart),
//         call(onSignUpStart),
//         call(onSignUpSuccess),
//     ])
// }

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
      const userSnapshot = yield call(
        getUserDocumentFromAuth,
        userAuth,
        additionalDetails
      );
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* signInWithGoogle() {
    try {
      const { user } = yield call(signInWithGooglePopup);
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield call(
        signInUserWithEmailAndPassword,
        email,
        password
      );
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* isUserAuthenticated() {
    try {
      const userAuth = yield call(getCurrentUser);
      if (!userAuth) return;
      yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
      yield put(signInFailed(error));
    }
  }
  
  export function* signUp({ payload: { email, password, displayName } }) {
    try {
      const { user } = yield call(
        createAuthUserWithEmailAndPassword,
        email,
        password
      );
      yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
      yield put(signUpFailed(error));
    }
  }
  
  export function* signOut() {
    try {
      yield call(signOutUser);
      yield put(signOutSuccess());
    } catch (error) {
      yield put(signOutFailed(error));
    }
  }
  
  export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
  }
  
  export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
  }
  
  export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
  }
  
  export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
  }
  
  export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
  }
  
  export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
  }
  
  export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
  }
  
  export function* userSagas() {
    yield all([
      call(onCheckUserSession),
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onSignUpStart),
      call(onSignUpSuccess),
      call(onSignOutStart),
    ]);
  }