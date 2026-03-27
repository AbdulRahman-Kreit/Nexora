"use client";
import dynamic from 'next/dynamic';
import RevenueAndProfitSkeleton from '@/components/products-analysis/skeletal-loading/RevenueAndProfitSkeleton';

const RevenueAndProfitChart = dynamic(() => import('@/components/products-analysis/charts/RevenueAndProfitChart'), {
    loading: () => <RevenueAndProfitSkeleton />,
    ssr: false,
});

export default function page() {
    return (
        <RevenueAndProfitChart />
    )
}
