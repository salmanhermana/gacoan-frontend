'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to menu dashboard by default
    router.push('/dashboard/menu');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Gacoan Kitchen Dashboard</h1>
        <p className="text-gray-600">Redirecting to menu dashboard...</p>
      </div>
    </div>
  );}