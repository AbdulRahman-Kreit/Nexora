"use client";
import dynamic from 'next/dynamic';
import RevenueBySubcategorySkeleton from '@/components/overview/skeletal-loading/RevenueBySubcategorySkeleton';

const RevenueBySubcategoryChart = dynamic(() => import('@/components/overview/charts/RevenueSubcategoryChart'),{
    loading: () => <RevenueBySubcategorySkeleton />,
    ssr: false,
});

export default function RevenueBySubcategory() {
    return (
        <RevenueBySubcategoryChart />
    )
}
