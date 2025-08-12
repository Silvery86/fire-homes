"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthButtons() {
    const auth = useAuth();

    return (
        <>
            {auth?.currentUser ? (
                <>
                    <div>{auth.currentUser.email}</div>
                    <Button className="cursor-pointer" onClick={() => auth.logout()}>Logout</Button>
                </>
            ) : (
                <>
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                    <Link href="/register" className="hover:underline">
                        Register
                    </Link>
                </>
            )}
        </>
    );
}