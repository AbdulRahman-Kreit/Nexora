"use client";
import dynamic from 'next/dynamic';
import OrderFrequencySkeleton from '@/components/customers-analysis/skeletal-loading/OrderFrequencySkeleton';

const OrderFrequencyChart = dynamic(() => import('@/components/customers-analysis/charts/OrderFrequencyChart'), {
    loading: () => <OrderFrequencySkeleton />,
    ssr: false
});

export default function Default() {
    return (
        <div>
        
        </div>
    )
}
