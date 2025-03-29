import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from cookies
  const token = request.cookies.get('next-auth.session-token');

  // If the user is not authenticated and trying to access protected routes
  if (!token && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/get-started', request.url));
  }

  // If the user is authenticated and trying to access auth routes
  if (token && (path.startsWith('/auth') || path === '/get-started' || path === '/register')) {
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