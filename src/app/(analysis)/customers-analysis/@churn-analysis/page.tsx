"use client";
import dynamic from 'next/dynamic';
import ChurnAnalysisSkeleton from '@/components/customers-analysis/skeletal-loading/ChurnAnalysisSkeleton';

const ChurnAnalysisChart = dynamic(() => import('@/components/customers-analysis/charts/ChurnAnalysisChart'), {
    loading: () => <ChurnAnalysisSkeleton />,
    ssr: false,
});

export default function ChurnAnalysis() {
    return (
        <ChurnAnalysisChart />
    )
}
