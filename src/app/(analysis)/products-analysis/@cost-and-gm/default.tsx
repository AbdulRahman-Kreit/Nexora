"use client";
import dynamic from 'next/dynamic';
import CostAndGMSkeleton from '@/components/products-analysis/skeletal-loading/CostAndGMSkeleton';

const CostAndGMChart = dynamic(() => import('@/components/products-analysis/charts/CostAndGMChart'), {
    loading: () => <CostAndGMSkeleton />,
    ssr: false,
});


export default function Default() {
    return (
        <CostAndGMChart />
    )
}
