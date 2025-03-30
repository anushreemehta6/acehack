'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AddProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    previousInvestments: '',
    fundingNeeded: '',
    equityToDilute: '',
    projectImage: null as File | null,
    imagePreview: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!checkAuth()) return;
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        projectImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const walletAddress = localStorage.getItem('walletAddress');
      if (!walletAddress) {
        throw new Error('Wallet not connected');
      }

      // Upload image to Firebase Storage
      let imageUrl = '';
      if (formData.projectImage) {
        const storage = await import('firebase/storage');
        const storageRef = storage.ref(storage.getStorage(), `projects/${walletAddress}/${Date.now()}_${formData.projectImage.name}`);
        const snapshot = await storage.uploadBytes(storageRef, formData.projectImage);
        imageUrl = await storage.getDownloadURL(snapshot.ref);
      }

      // Create project in MongoDB
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          creatorId: walletAddress,
          imageUrl,
          previousInvestments: parseFloat(formData.previousInvestments),
          fundingNeeded: parseFloat(formData.fundingNeeded),
          equityToDilute: parseFloat(formData.equityToDilute),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      console.log('Project created successfully:', data);
      router.push('/profile/creator/my-projects');
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {formData.imagePreview && (
                  <div className="relative w-32 h-32">
                    <Image
                      src={formData.imagePreview}
                      alt="Project preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>

            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* GitHub Link */}
            <div>
              <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                GitHub Link
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                required
                value={formData.githubLink}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Previous Investments */}
            <div>
              <label htmlFor="previousInvestments" className="block text-sm font-medium text-gray-700">
                Previous Investments (in USD)
              </label>
              <input
                type="number"
                id="previousInvestments"
                name="previousInvestments"
                min="0"
                step="0.01"
                required
                value={formData.previousInvestments}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Funding Needed */}
            <div>
              <label htmlFor="fundingNeeded" className="block text-sm font-medium text-gray-700">
                Funding Needed (in EDU tokens)
              </label>
              <input
                type="number"
                id="fundingNeeded"
                name="fundingNeeded"
                min="0"
                step="0.01"
                required
                value={formData.fundingNeeded}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Equity to Dilute */}
            <div>
              <label htmlFor="equityToDilute" className="block text-sm font-medium text-gray-700">
                Equity to Dilute (%)
              </label>
              <input
                type="number"
                id="equityToDilute"
                name="equityToDilute"
                min="0"
                max="100"
                step="0.01"
                required
                value={formData.equityToDilute}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 