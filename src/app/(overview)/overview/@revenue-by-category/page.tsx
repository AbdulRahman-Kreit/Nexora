import React, { Suspense, lazy } from 'react';
import RevenueByCategorySkeleton from '@/components/overview/skeletal-loading/RevenueByCategorySkeleton';

const RevenueByCategoryChart = lazy(() => import('@/components/overview/charts/RevenueByCategoryChart'));

export const runtime = 'edge';

export default function RevenueByCategory() {
    return (
        <div>
            <Suspense fallback={<RevenueByCategorySkeleton />}>
                <RevenueByCategoryChart />
            </Suspense>
        </div>
    )
}