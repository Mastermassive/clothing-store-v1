import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyAbivQCEqYca74F6TZVV6EvGDD84lTcZiM",
  authDomain: "clothing-store-db-deb2c.firebaseapp.com",
  projectId: "clothing-store-db-deb2c",
  storageBucket: "clothing-store-db-deb2c.appspot.com",
  messagingSenderId: "634083933302",
  appId: "1:634083933302:web:ce745f1ab9d9956d1ef357"
};

// const app = 
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
    collectionKey: string, 
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        querySnapshot => querySnapshot.data() as Category
    );
    
}

export type AdditionalInfo = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const getUserDocumentFromAuth = async(
    userAuth: User, 
    additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch(err) {
            console.log("error creating user", err)
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async(email: string, password: string) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => {
    return await signOut(auth);
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}