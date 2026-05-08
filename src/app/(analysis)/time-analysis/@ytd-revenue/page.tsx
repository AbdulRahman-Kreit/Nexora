"use client";
import React, { Suspense, lazy } from 'react';
import YTDrevenueSkeleton from '@/components/time-analysis/skeletal-loading/YTDrevenueSkeleton';

export const runtime = 'edge';

const YTDrevenueChart = lazy(() => import('@/components/time-analysis/charts/YTDrevenueChart'));

export default function YTDrevenue() {
    return (
        <Suspense fallback={<YTDrevenueSkeleton />}>
            <YTDrevenueChart />
        </Suspense>
    )
}