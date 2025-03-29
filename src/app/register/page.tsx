'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    router.push('/get-started');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Redirecting...</h2>
        <p className="mt-2 text-gray-600">Please wait while we take you to the registration page.</p>
      </div>
    </div>
  );
} 