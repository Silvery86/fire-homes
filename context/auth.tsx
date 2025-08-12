"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

type AuthContextType = {
    currentUser: User | null;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        })
        return () => unsubcribe();
        
    }, []);

    const logout = async () => {
            await auth.signOut();
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
    }


    return (
        <AuthContext.Provider value={{ 
            currentUser,
            logout,
            signInWithGoogle
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
    