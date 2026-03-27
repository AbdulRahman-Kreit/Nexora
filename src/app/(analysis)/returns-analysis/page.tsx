import React from 'react';
import Statistics from '@/components/returns-analysis/Statistics';

export default function ReturnsAnalysis() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Returns Analysis
            </h2>
            <p className="text-[16px] text-gray-500 mb-5 font-grotesk">
                Aug 6, 2024
            </p>
            <Statistics />
        </div>
    )
}
