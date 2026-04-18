import React from 'react'
import RealTimeDate from '@/components/general-components/RealTimeDate';

export default function ProductsAnalysis() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Products Analysis
            </h2>
            <RealTimeDate />
        </div>
    )
}
