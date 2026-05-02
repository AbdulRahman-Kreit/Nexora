"use client";
import dynamic from 'next/dynamic';
import RevenueByBusinessSkeleton from '@/components/overview/skeletal-loading/RevenueByBusinessSkeleton';

const RevenueByBusinessChart = dynamic(() => import('@/components/overview/charts/RevenueByBusinessChart'),{
    loading: () => <RevenueByBusinessSkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByBusinessChart />
    )
};