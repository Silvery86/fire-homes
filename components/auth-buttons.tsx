"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function AuthButtons() {
    const auth = useAuth();

    return (
        <>
            {auth?.currentUser ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            <Avatar>
                                {!!auth?.currentUser?.photoURL && (
                                    <AvatarImage
                                        src={auth?.currentUser?.photoURL}
                                        alt={`${auth.currentUser.displayName || "User"}'s avatar`}
                                        width={32}
                                        height={32}
                                        className="object-cover rounded-full"                       
                                    />
                                )}
                                <AvatarFallback>
                                    {auth?.currentUser?.displayName?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <div>{auth?.currentUser?.displayName || "User"}</div>
                                <div>{auth?.currentUser.email || "User Email"}</div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator asChild/>
                            <DropdownMenuItem>
                                <Link href="/account" className="w-full">
                                   My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/admin-dashboard" className="w-full">
                                   Admin Dashboard
                                </Link>
                            </DropdownMenuItem> 
                             <DropdownMenuItem>
                                <Link href="/account/my-favourites" className="w-full">
                                   My Favourites
                                </Link>
                            </DropdownMenuItem> 
                             <DropdownMenuItem>
                                <Button className="cursor-pointer w-full" onClick={async () => await auth.logout()}>
                                    Logout
                                </Button>
                            </DropdownMenuItem>                        
                        </DropdownMenuContent>
                    </DropdownMenu>
                   
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