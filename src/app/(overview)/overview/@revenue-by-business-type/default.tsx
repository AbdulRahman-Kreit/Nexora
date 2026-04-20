"use client";
import dynamic from 'next/dynamic';
import RevenueByBusinessSkeleton from '@/components/overview/skeletal-loading/RevenueBySubcategorySkeleton';

const RevenueByBusinessTypeChart = dynamic(() => import('@/components/overview/charts/RevenueSubcategoryChart'),{
    loading: () => <RevenueByBusinessSkeleton />,
    ssr: false,
});

export default function Default() {
    return (
        <RevenueByBusinessTypeChart />
    )
};