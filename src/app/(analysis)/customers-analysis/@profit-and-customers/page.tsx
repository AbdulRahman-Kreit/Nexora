"use client";
import React, { Suspense, lazy } from 'react';
import ProfitAndCustomersSkeleton from '@/components/customers-analysis/skeletal-loading/ProfitAndCustomersSkeleton';

export const runtime = 'edge';

const ProfitAndCustomersChart = lazy(() => import('@/components/customers-analysis/charts/ProfitAndCustomersChart'));

export default function ProfitAndCustomers() {
    return (
        <Suspense fallback={<ProfitAndCustomersSkeleton />}>
            <ProfitAndCustomersChart />
        </Suspense>
    )
}