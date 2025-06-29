'use client';

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import MenuContainer from './container/MenuContainer';

export default function MenuDashboard() {
  return (
    <DashboardLayout>
      <MenuContainer />
    </DashboardLayout>
  );
}