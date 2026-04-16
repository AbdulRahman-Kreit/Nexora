"use client";
import dynamic from 'next/dynamic';
import TopEmployeesSkeleton from '@/components/employee-analysis/skeletal-loading/TopEmployeeSkeleton';

const TopEmployeesChart = dynamic(() => import('@/components/employee-analysis/charts/TopEmployeesChart'), { 
    loading: () => <TopEmployeesSkeleton />,
    ssr: false
});

export default function TopEmployees() {
    return (
        <TopEmployeesChart/>
    )
}
