"use client";
import React, { Suspense, lazy } from 'react';
import CustomerReturnsByRegionSkeleton from '@/components/returns-analysis/skeletal-loading/CustomerReturnsByRegionSkeleton';

export const runtime = 'edge';

const CustomerReturnsByRegionChart = lazy(() => import('@/components/returns-analysis/chart/CustomerReturnsByRegionChart'));

export default function Default() {
    return (
        <Suspense fallback={<CustomerReturnsByRegionSkeleton />}>
            <CustomerReturnsByRegionChart />
        </Suspense>
    )
}