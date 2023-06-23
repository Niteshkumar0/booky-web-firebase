import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import React from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import firebase from 'firebase/compat/app'
const firebaseConfig = {
    apiKey: "AIzaSyA5HW_jrw_lpKi5tGCtyUC6O7O_rrLS8fQ",
    authDomain: "fir-project-6bb00.firebaseapp.com",
    projectId: "fir-project-6bb00",
    storageBucket: "fir-project-6bb00.appspot.com",
    messagingSenderId: "993301965973",
    appId: "1:993301965973:web:9291b83e2342319a5c3f9c"
  };

 export const app = initializeApp(firebaseConfig);

  let auth = getAuth(app)

export let FirebaseContext = createContext(null)

export let FirebaseProvider = (props) =>{
        return(
            <>
                <FirebaseContext.Provider value={{user}}>
                    {props.children}
                </FirebaseContext.Provider>
            </>
        )
}