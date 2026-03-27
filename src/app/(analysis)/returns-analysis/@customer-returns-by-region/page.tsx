"use client";
import dynamic from 'next/dynamic';
import CustomerReturnsByRegionSkeleton from '@/components/returns-analysis/skeletal-loading/CustomerReturnsByRegionSkeleton';

const CustomerReturnsByRegionChart = dynamic(() => import('@/components/returns-analysis/chart/CustomerReturnsByRegionChart'), {
    loading: () => <CustomerReturnsByRegionSkeleton />,
    ssr: false,
})

export default function CustomerReturnsByRegion() {
    return (
        <CustomerReturnsByRegionChart />
    )
}
