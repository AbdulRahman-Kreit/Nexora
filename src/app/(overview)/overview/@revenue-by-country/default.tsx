"use client";
import dynamic from 'next/dynamic';
import RevenueByCountrySkeleton from '@/components/overview/skeletal-loading/RevenueByCountrySkeleton';

const RevenueByCountryChart = dynamic(() => import('@/components/overview/charts/RevenueByCountryChart'), {
    loading: () => <RevenueByCountrySkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByCountryChart />
    )
};