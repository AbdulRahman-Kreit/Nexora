"use client";
import React, { Suspense, lazy } from 'react';
import CustomersWithoutOrdersSkeleton from '@/components/customers-analysis/skeletal-loading/CustomersWithoutOrdersSkeleton';

export const runtime = 'edge';

const CustomersWithoutOrdersChart = lazy(() => import('@/components/customers-analysis/charts/CustomersWithoutOrdersChart'));

export default function Default() {
    return (
        <Suspense fallback={<CustomersWithoutOrdersSkeleton />}>
            <CustomersWithoutOrdersChart />
        </Suspense>
    )
}