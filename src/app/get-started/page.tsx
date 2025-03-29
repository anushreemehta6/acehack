'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { connectMetaMask } from '@/utils/metamask';
import { signInWithGoogle } from '@/utils/googleAuth';
import { useState } from 'react';

export default function GetStarted() {
  const [tokenBalances, setTokenBalances] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleMetaMaskConnect = async (type: 'creator' | 'investor') => {
    try {
      setIsConnecting(true);
      const { address, ethBalance, tokens } = await connectMetaMask();
      console.log('Connected with MetaMask:', address);
      console.log('ETH Balance:', ethBalance);
      console.log('Token Balances:', tokens);
      setTokenBalances({ ethBalance, tokens });
      // TODO: Handle successful connection and redirect to appropriate dashboard
      window.location.href = `/dashboard/${type}`;
    } catch (error) {
      console.error('Failed to connect with MetaMask:', error);
      // TODO: Handle error
    } finally {
      setIsConnecting(false);
    }
  };

  const handleGoogleSignIn = async (type: 'creator' | 'investor') => {
    try {
      await signInWithGoogle();
      // Redirect is handled by NextAuth.js configuration
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
      // TODO: Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Get Started with Idea Nest
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Choose how you want to join our platform and start your journey
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Project Creator Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900">Project Creator</h2>
              <p className="mt-2 text-gray-600">
                Share your innovative ideas and connect with investors who believe in your vision.
              </p>
              <div className="mt-6 space-y-4">
                <Link
                  href="/auth/signup/creator"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up as Creator
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleMetaMaskConnect('creator')}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img className="h-5 w-5 mr-2" src="/metamask.svg" alt="MetaMask" />
                    {isConnecting ? 'Connecting...' : 'MetaMask'}
                  </button>
                  <button 
                    onClick={() => handleGoogleSignIn('creator')}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img className="h-5 w-5 mr-2" src="/google.svg" alt="Google" />
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Investor Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900">Investor</h2>
              <p className="mt-2 text-gray-600">
                Discover promising projects and invest in the next big innovation.
              </p>
              <div className="mt-6 space-y-4">
                <Link
                  href="/auth/signup/investor"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up as Investor
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleMetaMaskConnect('investor')}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img className="h-5 w-5 mr-2" src="/metamask.svg" alt="MetaMask" />
                    {isConnecting ? 'Connecting...' : 'MetaMask'}
                  </button>
                  <button 
                    onClick={() => handleGoogleSignIn('investor')}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <img className="h-5 w-5 mr-2" src="/google.svg" alt="Google" />
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Balances Display */}
        {tokenBalances && (
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Token Balances</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ETH Balance:</span>
                  <span className="font-medium">{tokenBalances.ethBalance} ETH</span>
                </div>
                {tokenBalances.tokens.map((token: any) => (
                  <div key={token.address} className="flex justify-between items-center">
                    <span className="text-gray-600">{token.name} ({token.symbol}):</span>
                    <span className="font-medium">{token.balance} {token.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 