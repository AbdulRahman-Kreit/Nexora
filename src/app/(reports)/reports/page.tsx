import RealTimeDate from '@/components/general-components/RealTimeDate'
import React from 'react'

export default function Reports() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Reports
            </h2>
            <RealTimeDate />
        </div>
    )
}
