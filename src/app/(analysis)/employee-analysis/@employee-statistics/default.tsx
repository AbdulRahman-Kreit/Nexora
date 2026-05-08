"use client";
import React, { Suspense, lazy } from 'react';
import EmployeeStatisticsSkeleton from '@/components/employee-analysis/skeletal-loading/EmployeeStatisticsSkeleton';

export const runtime = 'edge';

const EmployeeStatisticsChart = lazy(() => import('@/components/employee-analysis/charts/EmployeeStatisticsChart'));

export default function Default() {
    return (
        <Suspense fallback={<EmployeeStatisticsSkeleton />}>
            <EmployeeStatisticsChart />
        </Suspense>
    )
}