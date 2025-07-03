'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isMenuActive = pathname === '/dashboard/menu';
  const isKitchenActive = pathname === '/dashboard/kitchen';
  const isWaiterActive = pathname === '/dashboard/waiter';

  return (
    <div className="min-h-screen bg-white-200 font-inter">
      {/* Navigation Bar */}
      <div className="shadow-md bg-white h-[99px] flex flex-row items-center justify-center px-[97px]">
        <button
          onClick={() => router.push('/dashboard/menu')}
          className={`w-[415.3px] h-full flex items-center justify-center font-semibold border-b-4 ${
            isMenuActive ? 'text-tomato bg-white border-tomato' : 'text-black bg-white border-transparent'
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => router.push('/dashboard/kitchen')}
          className={`w-[415.3px] h-full flex items-center justify-center font-semibold border-b-4 ${
            isKitchenActive ? 'text-tomato bg-white border-tomato' : 'text-black bg-white border-transparent'
          }`}
        >
          Antrian Order
        </button>
        <button
          onClick={() => router.push('/dashboard/waiter')}
          className={`w-[415.3px] h-full flex items-center justify-center font-semibold border-b-4 ${
            isWaiterActive ? 'text-tomato bg-white border-tomato' : 'text-black bg-white border-transparent'
          }`}
        >
          Waiter
        </button>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;