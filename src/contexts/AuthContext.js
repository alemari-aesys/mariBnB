import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"

const context = React.createContext();

export function useAuth() {
    return useContext(context)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
            // console.log(user.email);
        })

        return unsubscribe
    }, [])

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
      }

    const value = {
        login,
        signup
    }

    return (
        <context.Provider value={value, currentUser}>
            {!loading && children}
        </context.Provider>
    )
}
