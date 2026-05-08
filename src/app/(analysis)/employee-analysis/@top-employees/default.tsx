"use client";
import React, { Suspense, lazy } from 'react';
import TopEmployeesSkeleton from '@/components/employee-analysis/skeletal-loading/TopEmployeeSkeleton';

export const runtime = 'edge';

const TopEmployeesChart = lazy(() => import('@/components/employee-analysis/charts/TopEmployeesChart'));

export default function Default() {
    return (
        <Suspense fallback={<TopEmployeesSkeleton />}>
            <TopEmployeesChart />
        </Suspense>
    );
}