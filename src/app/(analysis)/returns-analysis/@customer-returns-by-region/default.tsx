"use client";
import dynamic from 'next/dynamic';
import CustomerReturnsByRegionSkeleton from '@/components/return-analysis/skeletal-loading/CustomerReturnsByRegionSkeleton';

const CustomerReturnsByRegionChart = dynamic(() => import('@/components/return-analysis/chart/CustomerReturnsByRegionChart'), {
    loading: () => <CustomerReturnsByRegionSkeleton />,
    ssr: false,
})


export default function Default() {
    return (
        <CustomerReturnsByRegionChart />
    )
}
