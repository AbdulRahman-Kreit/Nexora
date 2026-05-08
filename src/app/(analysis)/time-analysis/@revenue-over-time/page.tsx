"use client";
import React, { Suspense, lazy } from 'react';
import RevenueOverTimeSkeleton from '@/components/time-analysis/skeletal-loading/RevenueOverTimeSkeleton';

export const runtime = 'edge';

const RevenueOverTimeTable = lazy(() => import('@/components/time-analysis/charts/RevenueOverTimeTable'));

export default function RevenueOverTime() {
    return (
        <Suspense fallback={<RevenueOverTimeSkeleton />}>
            <RevenueOverTimeTable />
        </Suspense>
    )
}