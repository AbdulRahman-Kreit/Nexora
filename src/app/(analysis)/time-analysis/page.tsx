import React from 'react';
import Statistics from '@/components/time-analysis/Statistics';
import RealTimeDate from '@/components/general-components/RealTimeDate';

export default function TimeAnalysis() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Time Analysis
            </h2>
            <RealTimeDate />
            <Statistics />
        </div>
    )
}
