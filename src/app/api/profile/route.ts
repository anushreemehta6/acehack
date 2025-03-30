import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie.value, true);
    
    await connectDB();
    
    // Get the user's profile
    const profile = await UserProfile.findOne({ email: decodedClaims.email });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('__session');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie.value, true);

    await connectDB();
    const data = await request.json();

    // Check if profile already exists
    let profile = await UserProfile.findOne({ email: decodedClaims.email });

    if (profile) {
      // Update existing profile
      profile = await UserProfile.findOneAndUpdate(
        { email: decodedClaims.email },
        {
          ...data,
          userId: decodedClaims.email,
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await UserProfile.create({
        ...data,
        userId: decodedClaims.email,
        email: decodedClaims.email,
      });
    }

    return NextResponse.json(
      { message: 'Profile updated successfully', profile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 