"use client";
import React, { Suspense, lazy } from 'react';
import CostAndGMSkeleton from '@/components/products-analysis/skeletal-loading/CostAndGMSkeleton';

export const runtime = 'edge';

const CostAndGMChart = lazy(() => import('@/components/products-analysis/charts/CostAndGMChart'));

export default function Default() {
    return (
        <Suspense fallback={<CostAndGMSkeleton />}>
            <CostAndGMChart />
        </Suspense>
    )
}