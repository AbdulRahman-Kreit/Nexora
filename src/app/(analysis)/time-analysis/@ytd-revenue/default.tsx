"use client";
import dynamic from 'next/dynamic';
import YTDrevenueSkeleton from '@/components/time-analysis/skeletal-loading/YTDrevenueSkeleton';

const YTDrevenueChart = dynamic(() => import('@/components/time-analysis/charts/YTDrevenueChart'), {
    loading: () => <YTDrevenueSkeleton />,
    ssr: false,
});


export default function Default() {
    return (
        <YTDrevenueChart />
    )
}
