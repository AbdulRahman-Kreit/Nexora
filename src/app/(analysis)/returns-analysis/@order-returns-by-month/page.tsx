"use client";
import dynamic from 'next/dynamic';
import OrderReturnsByMonthSkeleton from '@/components/returns-analysis/skeletal-loading/OrderReturnsByMonthSkeleton';

const OrderReturnsByMonthChart = dynamic(() => import('@/components/returns-analysis/chart/OrderReturnsByMonthChart'), {
    loading: () => <OrderReturnsByMonthSkeleton />,
    ssr: false
});

export default function OrderReturnsByMonth() {
    return (
        <OrderReturnsByMonthChart />
    )
}
