"use client";
import dynamic from 'next/dynamic';
import OrderReturnsByMonthSkeleton from '@/components/return-analysis/skeletal-loading/OrderReturnsByMonthSkeleton';

const OrderReturnsByMonthChart = dynamic(() => import('@/components/return-analysis/chart/OrderReturnsByMonthChart'), {
    loading: () => <OrderReturnsByMonthSkeleton />,
    ssr: false
});


export default function Default() {
    return (
        <OrderReturnsByMonthChart />
    )
}
