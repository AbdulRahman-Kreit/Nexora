"use client";
import React, { Suspense, lazy } from 'react';
import RevenueAndProfitSkeleton from '@/components/products-analysis/skeletal-loading/RevenueAndProfitSkeleton';

export const runtime = 'edge';

const RevenueAndProfitChart = lazy(() => import('@/components/products-analysis/charts/RevenueAndProfitChart'));

export default function Default() {
    return (
        <Suspense fallback={<RevenueAndProfitSkeleton />}>
            <RevenueAndProfitChart />
        </Suspense>
    )
}