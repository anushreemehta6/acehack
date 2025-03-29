import { signIn } from 'next-auth/react';

export const signInWithGoogle = async () => {
  try {
    const result = await signIn('google', {
      callbackUrl: '/dashboard',
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}; 