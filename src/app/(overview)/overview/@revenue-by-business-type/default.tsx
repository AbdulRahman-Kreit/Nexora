"use client";
import dynamic from 'next/dynamic';
import RevenueByBusinessSkeleton from '@/components/overview/skeletal-loading/RevenueByBusinessSkeleton';

const RevenueByBusinessTypeChart = dynamic(() => import('@/components/overview/charts/RevenueByBusinessTypeChart'),{
    loading: () => <RevenueByBusinessSkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByBusinessTypeChart />
    )
};