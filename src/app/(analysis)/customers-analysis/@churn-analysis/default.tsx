import React, { Suspense, lazy } from 'react';
import ChurnAnalysisSkeleton from '@/components/customers-analysis/skeletal-loading/ChurnAnalysisSkeleton';

const ChurnAnalysisChart = lazy(() => import('@/components/customers-analysis/charts/ChurnAnalysisChart'));

export const runtime = 'edge';

export default function Default() {
    return (
        <Suspense fallback={<ChurnAnalysisSkeleton />}>
            <ChurnAnalysisChart />
        </Suspense>
    )
}