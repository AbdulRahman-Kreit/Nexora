"use client";
import dynamic from "next/dynamic";
import EmployeeReturnsSkeleton from "@/components/employee-analysis/skeletal-loading/EmployeeReturnsSkeleton";

const EmployeeReturnsChart = dynamic(() => import("@/components/employee-analysis/charts/EmployeeReturnsChart"), { 
    loading: () => <EmployeeReturnsSkeleton />,
    ssr: false 
});

export default function EmployeeReturns() {
    return (
        <EmployeeReturnsChart />
    );
}