"use client";
import React, { Suspense, lazy } from 'react';
import OrderReturnsBySubcategorySkeleton from '@/components/returns-analysis/skeletal-loading/OrderReturnsBySubcategorySkeleton';

export const runtime = 'edge';

const OrderReturnsBySubcategoryChart = lazy(() => import('@/components/returns-analysis/chart/OrderReturnsBySubcategoryChart'));

export default function Default() {
    return (
        <Suspense fallback={<OrderReturnsBySubcategorySkeleton />}>
            <OrderReturnsBySubcategoryChart />
        </Suspense>
    )
}