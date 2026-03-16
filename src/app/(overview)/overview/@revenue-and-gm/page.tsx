"use client";
import dynamic from 'next/dynamic';
import RevenueAndGMSkeleton from '@/components/overview/skeletal-loading/RevenueAndGMSkeleton';

const RevenueAndGMChart = dynamic(() => import('@/components/overview/charts/RevenueAndGMChart'), {
    loading: () => <RevenueAndGMSkeleton />,
    ssr: false,
});

export default function RevenueAndGM() {
    return (
        <RevenueAndGMChart />
    )
}

