"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, ParsedToken, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { removeToken, setToken } from "./actions";

type AuthContextType = {
    currentUser: User | null;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    customClaims: ParsedToken | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                const tokenResult = await user.getIdTokenResult();
                const token = tokenResult.token;
                const refreshToken = user.refreshToken;
                const claims = tokenResult.claims;
                setCustomClaims(claims ?? null);
                if (token && refreshToken) {
                    setToken({
                        token,
                        refreshToken: refreshToken
                    });
                }
            }else {
                await removeToken();
            }
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
    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ 
            currentUser,
            logout,
            signInWithEmail, 
            signInWithGoogle,
            customClaims
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
    