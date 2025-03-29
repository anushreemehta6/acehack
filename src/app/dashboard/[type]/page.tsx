'use client';

import { useParams } from 'next/navigation';

export default function Dashboard() {
  const params = useParams();
  const type = params.type as 'creator' | 'investor';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to your {type === 'creator' ? 'Creator' : 'Investor'} Dashboard
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {type === 'creator'
              ? 'Start sharing your innovative ideas and connect with potential investors.'
              : 'Discover promising projects and start investing in the next big innovation.'}
          </p>
        </div>

        <div className="mt-12">
          {/* TODO: Add dashboard content */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">
              Your dashboard is being set up. You'll be able to {type === 'creator' ? 'manage your projects' : 'view investment opportunities'} here soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 