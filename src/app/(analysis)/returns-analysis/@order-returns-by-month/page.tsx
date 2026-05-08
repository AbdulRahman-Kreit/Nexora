"use client";
import React, { Suspense, lazy } from 'react';
import OrderReturnsByMonthSkeleton from '@/components/returns-analysis/skeletal-loading/OrderReturnsByMonthSkeleton';

export const runtime = 'edge';

const OrderReturnsByMonthChart = lazy(() => import('@/components/returns-analysis/chart/OrderReturnsByMonthChart'));

export default function OrderReturnsByMonth() {
    return (
        <Suspense fallback={<OrderReturnsByMonthSkeleton />}>
            <OrderReturnsByMonthChart />
        </Suspense>
    )
}