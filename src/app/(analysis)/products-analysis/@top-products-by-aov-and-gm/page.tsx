"use client";
import React, { Suspense, lazy } from 'react';
import TopProductsbyAOVandGMSkeleton from '@/components/products-analysis/skeletal-loading/TopProductsbyAOVandGMSkeleton';

export const runtime = 'edge';

const TopProductsByAOVandGMChart = lazy(() => import('@/components/products-analysis/charts/TopProductsByAOVandGMChart'));

export default function TopProductsByAOVandGM() {
    return (
        <Suspense fallback={<TopProductsbyAOVandGMSkeleton />}>
            <TopProductsByAOVandGMChart />
        </Suspense>
    )
}