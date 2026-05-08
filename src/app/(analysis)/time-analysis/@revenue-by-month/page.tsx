"use client";
import React, { Suspense, lazy } from 'react';
import RevenueByMonthSkeleton from '@/components/time-analysis/skeletal-loading/RevenueByMonthSkeleton';

export const runtime = 'edge';

const RevenueByMonthChart = lazy(() => import('@/components/time-analysis/charts/RevenueByMonthChart'));

export default function RevenueByMonth() {
    return (
        <Suspense fallback={<RevenueByMonthSkeleton />}>
            <RevenueByMonthChart />
        </Suspense>
    )
}