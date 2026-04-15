"use client";
import dynamic from 'next/dynamic';
import RevenueByMonthSkeleton from '@/components/time-analysis/skeletal-loading/RevenueByMonthSkeleton';

const RevenueByMonthChart = dynamic(() => import('@/components/time-analysis/charts/RevenueByMonthChart'), {
    loading: () => <RevenueByMonthSkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByMonthChart />
    )
}
