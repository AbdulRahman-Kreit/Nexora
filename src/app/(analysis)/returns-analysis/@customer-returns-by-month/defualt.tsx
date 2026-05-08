"use client";
import React, { Suspense, lazy } from 'react';
import CustomerReturnsByMonthSkeleton from '@/components/returns-analysis/skeletal-loading/CustomerReturnsByMonthSkeleton';

export const runtime = 'edge';

const CustomerReturnsByMonthChart = lazy(() => import('@/components/returns-analysis/chart/CustomerReturnsByMonthChart'));

export default function Defualt() {
    return (
        <Suspense fallback={<CustomerReturnsByMonthSkeleton />}>
            <CustomerReturnsByMonthChart />
        </Suspense>
    )
}