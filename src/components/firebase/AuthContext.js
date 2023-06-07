import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'; 



const firebaseConfig = {
    apiKey: "AIzaSyD3k7K7kiXAAW4lq5KKiiXeW0ZiV9FHn1o",
  authDomain: "connectarts-4ce5e.firebaseapp.com",
  projectId: "connectarts-4ce5e",
  storageBucket: "connectarts-4ce5e.appspot.com",
  messagingSenderId: "992637748222",
  appId: "1:992637748222:web:26c4e58e65f3af502c76af",
  measurementId: "G-94MZZV67W4"
}


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider(); 


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword( email, password);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider); // Use the Google Auth provider for sign-in
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
