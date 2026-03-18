"use client";
import dynamic from 'next/dynamic';
import ProfitAndCustomersSkeleton from '@/components/customers-analysis/skeletal-loading/ProfitAndCustomersSkeleton';

const ProfitAndCustomersChart = dynamic(() => import('@/components/customers-analysis/charts/ProfitAndCustomersChart'), {
    loading: () => <ProfitAndCustomersSkeleton />,
    ssr: false,
});

export default function ProfitAndCustomers() {
    return (
        <ProfitAndCustomersChart />
    )
}
