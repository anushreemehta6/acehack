'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  FolderIcon,
  PlusCircleIcon,
  HeartIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

export default function CreatorDashboard() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  const connectMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        console.log('Connected to MetaMask:', accounts[0]);
      } else {
        alert('Please install MetaMask to use this feature');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Creator Dashboard</h2>
          </div>
          <nav className="mt-4">
            <Link
              href="/profile/creator"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              View All Projects
            </Link>
            <Link
              href="/profile/creator/my-projects"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FolderIcon className="w-5 h-5 mr-3" />
              Your Projects
            </Link>
            <Link
              href="/profile/creator/add-project"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <PlusCircleIcon className="w-5 h-5 mr-3" />
              Add Project
            </Link>
            <Link
              href="/profile/creator/interested"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <HeartIcon className="w-5 h-5 mr-3" />
              Interested Projects
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* MetaMask Connection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Connect MetaMask</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Connect your wallet to start creating and managing projects
                  </p>
                </div>
                <button
                  onClick={connectMetaMask}
                  className={`px-4 py-2 rounded-md text-white ${
                    isConnected
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isConnected ? 'Connected' : 'Connect MetaMask'}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-500">Total Projects</h4>
                <p className="text-2xl font-semibold text-gray-900 mt-2">0</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-500">Total Funding</h4>
                <p className="text-2xl font-semibold text-gray-900 mt-2">0 EDU</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-sm font-medium text-gray-500">Active Projects</h4>
                <p className="text-2xl font-semibold text-gray-900 mt-2">0</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="text-center text-gray-500 py-8">
                <p>No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 