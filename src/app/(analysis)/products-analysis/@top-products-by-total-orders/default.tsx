"use client";
import React, { Suspense, lazy } from 'react';
import TopProductsbyTotalOrdersSkeleton from "@/components/products-analysis/skeletal-loading/TopProductsbyTotalOrdersSkeleton";

export const runtime = 'edge';

const TopProductsbyTotalOrdersChart = lazy(() => import('@/components/products-analysis/charts/TopProductsbyTotalOrdersChart'));

export default function Default() {
    return (
        <Suspense fallback={<TopProductsbyTotalOrdersSkeleton />}>
            <TopProductsbyTotalOrdersChart />
        </Suspense>
    )
}