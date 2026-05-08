"use client";
import React, { Suspense, lazy } from 'react';
import OrderFrequencySkeleton from '@/components/customers-analysis/skeletal-loading/OrderFrequencySkeleton';

export const runtime = 'edge';

const OrderFrequencyChart = lazy(() => import('@/components/customers-analysis/charts/OrderFrequencyChart'));

export default function Default() {
    return (
        <Suspense fallback={<OrderFrequencySkeleton />}>
            <OrderFrequencyChart />
        </Suspense>
    )
}