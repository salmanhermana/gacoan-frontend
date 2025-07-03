import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WaiterContainer from './container/WaiterContainer';

const WaiterPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Pelayan</h1>
      <WaiterContainer />
    </div>
  );
};

export default WaiterPage;
