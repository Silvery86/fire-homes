'use client'

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button"
import { auth } from "@/firebase/client";

export default function ContinueWithGoogleButton() {
    return (
        <Button onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then((result) => {
                console.log("User signed in with Google:", result.user);
            }).catch((error) => {
                console.error("Error signing in with Google:", error);
            })
        }}>
            Continue with Google
        </Button>
    )}