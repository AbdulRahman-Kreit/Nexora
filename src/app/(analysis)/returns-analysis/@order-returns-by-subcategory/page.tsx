"use client";
import dynamic from 'next/dynamic';
import OrderReturnsBySubcategorySkeleton from '@/components/returns-analysis/skeletal-loading/OrderReturnsBySubcategorySkeleton';

const OrderReturnsBySubcategoryChart = dynamic(() => import('@/components/returns-analysis/chart/OrderReturnsBySubcategoryChart'), {
    loading: () => <OrderReturnsBySubcategorySkeleton />,
    ssr: false
});

export default function OrderReturnsBySubcategory() {
    return (
        <OrderReturnsBySubcategoryChart />
    )
}
