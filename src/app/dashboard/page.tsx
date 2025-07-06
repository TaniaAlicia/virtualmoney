'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import BaseLayout from '@/components/generals/BaseLayout';

export default function DashboardPage() {
  useAuthRedirect();
    
  return (
    <BaseLayout variant="dashboard">
      <h1 className="text-2xl font-bold">DASHBOARD</h1>
    </BaseLayout>
  );
}
