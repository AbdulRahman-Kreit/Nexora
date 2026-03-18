"use client";
import dynamic from 'next/dynamic';
import CustomersWithoutOrdersSkeleton from '@/components/customers-analysis/skeletal-loading/CustomersWithoutOrdersSkeleton';

const CustomersWithoutOrdersChart = dynamic(() => import('@/components/customers-analysis/charts/CustomersWithoutOrdersChart'), {
    loading: () => <CustomersWithoutOrdersSkeleton />,
    ssr: false,
});

export default function CustomersWithoutOrders() {
    return (
        <CustomersWithoutOrdersChart />
    )
}
