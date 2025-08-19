import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request : NextRequest) {
    if (request.method === "POST") {
        return NextResponse.next();
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken || !decodedToken.admin) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin-dashboard"
    ]
}