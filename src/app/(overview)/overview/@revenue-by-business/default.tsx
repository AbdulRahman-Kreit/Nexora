import React, { Suspense, lazy } from 'react';
import RevenueByBusinessSkeleton from '@/components/overview/skeletal-loading/RevenueByBusinessSkeleton';

const RevenueByBusinessChart = lazy(() => import('@/components/overview/charts/RevenueByBusinessChart'));

export const runtime = 'edge';

export default function Default() {
    return (
        <Suspense fallback={<RevenueByBusinessSkeleton />}>
            <RevenueByBusinessChart />
        </Suspense>
    );
}