"use client";
import dynamic from 'next/dynamic';
import OrderReturnsBySubcategorySkeleton from '@/components/return-analysis/skeletal-loading/OrderReturnsBySubcategorySkeleton';

const OrderReturnsBySubcategoryChart = dynamic(() => import('@/components/return-analysis/chart/OrderReturnsBySubcategoryChart'), {
    loading: () => <OrderReturnsBySubcategorySkeleton />,
    ssr: false
});

export default function OrderReturnsBySubcategory() {
    return (
        <OrderReturnsBySubcategoryChart />
    )
}
