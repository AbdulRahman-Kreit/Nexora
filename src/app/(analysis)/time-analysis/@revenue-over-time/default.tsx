"use client";
import dynamic from 'next/dynamic';
import RevenueOverTimeSkeleton from '@/components/time-analysis/skeletal-loading/RevenueOverTimeSkeleton';

const RevenueOverTimeTable = dynamic(() => import('@/components/time-analysis/charts/RevenueOverTimeTable'), {
    loading: () => <RevenueOverTimeSkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueOverTimeTable />
    )
}
