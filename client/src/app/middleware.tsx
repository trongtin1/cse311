import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = req.cookies.get('authToken');

    if (!token) {
        return NextResponse.redirect('/link');
    }
    return NextResponse.next();
}