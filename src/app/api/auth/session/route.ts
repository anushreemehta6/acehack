import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      console.error('No ID token provided');
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }

    console.log('Creating session cookie with ID token');
    
    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    console.log('Session cookie created successfully');
    
    // Set the cookie
    const cookieStore = await cookies();
    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    });

    console.log('Cookie set successfully');

    return NextResponse.json({ 
      status: 'success',
      message: 'Session created successfully'
    });
  } catch (error: any) {
    console.error('Session creation error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Check for specific Firebase Admin SDK errors
    if (error.code === 'auth/invalid-id-token') {
      return NextResponse.json(
        { error: 'Invalid ID token provided' },
        { status: 401 }
      );
    }
    
    if (error.code === 'auth/expired-id-token') {
      return NextResponse.json(
        { error: 'ID token has expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create session',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
} 