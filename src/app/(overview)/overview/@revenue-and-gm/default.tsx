import React, { Suspense, lazy } from 'react';
import RevenueAndGMSkeleton from '@/components/overview/skeletal-loading/RevenueAndGMSkeleton';

const RevenueAndGMChart = lazy(() => import('@/components/overview/charts/RevenueAndGMChart'));

export const runtime = 'edge';

export default function Default() {
    return (
        <Suspense fallback={<RevenueAndGMSkeleton />}>
            <RevenueAndGMChart />
        </Suspense>
    );
}