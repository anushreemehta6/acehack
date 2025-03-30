'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { connectMetaMask } from '@/utils/metamask';

export default function InvestorSignup() {
  const handleMetaMaskConnect = async () => {
    try {
      const { address } = await connectMetaMask();
      console.log('Connected with MetaMask:', address);
      // TODO: Handle successful connection
    } catch (error) {
      console.error('Failed to connect with MetaMask:', error);
      // TODO: Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/get-started"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Get Started
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up as an Investor
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to start investing in innovative projects
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Connect with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleMetaMaskConnect}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5"
                  src="/metamask.svg"
                  alt="MetaMask"
                />
                <span className="ml-2">MetaMask</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 