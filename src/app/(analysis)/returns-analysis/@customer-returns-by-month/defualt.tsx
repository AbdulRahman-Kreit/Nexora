"use client";
import dynamic from 'next/dynamic';
import CustomerReturnsByMonthSkeleton from '@/components/returns-analysis/skeletal-loading/CustomerReturnsByMonthSkeleton';

const CustomerReturnsByMonthChart = dynamic(() => import('@/components/returns-analysis/chart/CustomerReturnsByMonthChart'), {
    loading: () => <CustomerReturnsByMonthSkeleton />,
    ssr: false
});


export default function Defualt() {
    return (
        <CustomerReturnsByMonthChart />
    )
}
