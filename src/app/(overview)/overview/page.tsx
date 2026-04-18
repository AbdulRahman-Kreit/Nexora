import React from 'react';
import Statistics from '@/components/overview/Statistics';
import RealTimeDate from '@/components/general-components/RealTimeDate';

export default function Overview() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Overview
            </h2>
            <RealTimeDate />
            <Statistics />
        </div>
    )
}
