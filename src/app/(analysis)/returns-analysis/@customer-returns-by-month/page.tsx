"use client";
import dynamic from 'next/dynamic';
import CustomerReturnsByMonthSkeleton from '@/components/return-analysis/skeletal-loading/CustomerReturnsByMonthSkeleton';

const CustomerReturnsByMonthChart = dynamic(() => import('@/components/return-analysis/chart/CustomerReturnsByMonthChart'), {
    loading: () => <CustomerReturnsByMonthSkeleton />,
    ssr: false,
});

export default function CustomerReturnsByMonth() {
    return (
        <CustomerReturnsByMonthChart />
    )
}
