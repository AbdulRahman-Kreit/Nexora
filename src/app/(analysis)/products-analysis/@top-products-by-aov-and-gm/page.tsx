"use client";
import dynamic from 'next/dynamic';
import TopProductsbyAOVandGMSkeleton from '@/components/products-analysis/skeletal-loading/TopProductsbyAOVandGMSkeleton';

const TopProductsByAOVandGMChart = dynamic(() => import('@/components/products-analysis/charts/TopProductsByAOVandGMChart'), {
    loading: () => <TopProductsbyAOVandGMSkeleton />,
    ssr: false,
});

export default function page() {
    return (
        <TopProductsByAOVandGMChart />
    )
}
