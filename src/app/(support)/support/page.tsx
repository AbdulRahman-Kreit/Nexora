import React from 'react'
import RealTimeDate from '@/components/general-components/RealTimeDate'

export default function Support() {
    return (
        <div className={`flex flex-col px-5`}>
            <h2 className="text-2xl font-semibold mb-1 font-clash">
                Frequently Asked Questions
            </h2>
            <RealTimeDate />
            <p className="text-[16px] text-gray-500 mb-5 opacity-70 -mt-4 font-grotesk">
                Find answers to common questions about our services
            </p>
        </div>
    )
}
