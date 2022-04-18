import React from 'react'

import { initializeApp } from "firebase/app";
import{
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
}from "firebase/firestore";

import { logout } from './actions/authActions';

const firebaseConfig = {
    apiKey: "AIzaSyDFppjnE3PiDqZ1OlixWt40xLhvG6GsYVQ",
    authDomain: "question-answers-app-3f0da.firebaseapp.com",
    projectId: "question-answers-app-3f0da",
    storageBucket: "question-answers-app-3f0da.appspot.com",
    messagingSenderId: "930178625473",
    appId: "1:930178625473:web:7d47ab9af63973337f0940"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
        });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
  
function SignOut({ dispatch }) {
    return (
        auth.currentUser && (
        <button
            className="button right"
            onClick={() => {
            dispatch(logout())
            auth.signOut();
            }}
        >
            Sign out
        </button>
        )
    );
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (firstName, lastName, email, password, profileImage) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
      profileImage
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
    auth,
    app,
    db,
    signInWithGoogle,
    SignOut,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
}