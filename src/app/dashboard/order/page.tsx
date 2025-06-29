'use client';

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import OrderContainer from './container/OrderContainer';

export default function OrderDashboard() {
  return (
    <DashboardLayout>
      <OrderContainer />
    </DashboardLayout>
  );
}