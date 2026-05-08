import React, { Suspense, lazy } from 'react';
import RevenueByCountrySkeleton from '@/components/overview/skeletal-loading/RevenueByCountrySkeleton';

const RevenueByCountryChart = lazy(() => import('@/components/overview/charts/RevenueByCountryChart'));

export const runtime = 'edge';

export default function Default() {
    return (
        <Suspense fallback={<RevenueByCountrySkeleton />}>
            <RevenueByCountryChart />
        </Suspense>
    )
};