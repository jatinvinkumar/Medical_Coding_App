import {useContext, createContext, useEffect, useState} from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, GithubAuthProvider} from "firebase/auth"
import { OAuthProvider } from "firebase/auth";

import { auth } from "./firebase"
const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(99)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }

    }, [])

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const githubSignIn = () => {
        const provider = new GithubAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const microsoftSignIn = () => {
        const provider = new OAuthProvider('microsoft.com');
        return signInWithPopup(auth, provider)
    }
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{createUser, loginUser, logOut, user, googleSignIn, githubSignIn, microsoftSignIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}