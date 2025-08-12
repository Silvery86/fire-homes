'use client'

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button"


export default function ContinueWithGoogleButton() {
    const auth = useAuth();

    return (
        <Button onClick={() => auth?.signInWithGoogle()}>
            Continue with Google
        </Button>
    )}