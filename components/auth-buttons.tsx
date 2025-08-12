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
                <div className="flex space-x-4 items-center">
                    <Link href="/login" className="button-link">
                        Login
                    </Link>
                    <div className="h-7 w-[1px] bg-secondary" />
                    <Link href="/register" className="button-link">
                        Register
                    </Link>
                </div>
            )}
        </>
    );
}