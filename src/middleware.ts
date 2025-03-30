import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the Firebase session cookie
  const sessionCookie = request.cookies.get('__session');

  // If the user is not authenticated and trying to access protected routes
  if (!sessionCookie && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/get-started', request.url));
  }

  // If the user is authenticated and trying to access auth routes
  if (sessionCookie && (path.startsWith('/auth') || path === '/get-started' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard/creator', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/get-started',
    '/register',
  ],
}; 