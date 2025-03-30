'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
  previousInvestments: number;
  fundingNeeded: number;
  equityToDilute: number;
  imageUrl: string;
  status: string;
  totalFunding: number;
  createdAt: string;
}

export default function MyProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const userType = localStorage.getItem('userType');
      const walletAddress = localStorage.getItem('walletAddress');

      if (!userType || !walletAddress) {
        router.push('/get-started');
        return false;
      }

      if (userType !== 'creator') {
        router.push('/profile/setup');
        return false;
      }

      return true;
    };

    const fetchProjects = async () => {
      if (!checkAuth()) return;

      try {
        const walletAddress = localStorage.getItem('walletAddress');
        console.log('Fetching projects for wallet:', walletAddress);
        
        const response = await fetch(`/api/projects?creatorId=${walletAddress}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch projects');
        }

        const data = await response.json();
        console.log('Fetched projects:', data);
        setProjects(data);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <Link
            href="/profile/creator/add-project"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add New Project
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">You haven't created any projects yet.</p>
            <Link
              href="/profile/creator/add-project"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={project.imageUrl || '/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Funding Needed:</span>
                      <span className="font-medium">{project.fundingNeeded} EDU</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Funding:</span>
                      <span className="font-medium">{project.totalFunding} EDU</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Equity:</span>
                      <span className="font-medium">{project.equityToDilute}%</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      View on GitHub
                    </a>
                    <span className="text-xs text-gray-500">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 