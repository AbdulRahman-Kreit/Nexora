"use client";
import React, { Suspense, lazy } from 'react';
import EmployeeReturnsSkeleton from "@/components/employee-analysis/skeletal-loading/EmployeeReturnsSkeleton";

export const runtime = 'edge';

const EmployeeReturnsChart = lazy(() => import("@/components/employee-analysis/charts/EmployeeReturnsChart"));

export default function Default() {
    return (
        <Suspense fallback={<EmployeeReturnsSkeleton />}>
            <EmployeeReturnsChart />
        </Suspense>
    )
}