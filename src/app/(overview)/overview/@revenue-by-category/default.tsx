"use client";
import dynamic from 'next/dynamic';
import RevenueByCategorySkeleton from '@/components/overview/skeletal-loading/RevenueByCategorySkeleton';

const RevenueByCategoryChart = dynamic(() => import('@/components/overview/charts/RevenueByCategoryChart'), {
    loading: () => <RevenueByCategorySkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByCategoryChart />
    )
};