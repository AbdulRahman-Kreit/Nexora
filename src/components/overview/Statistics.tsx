import React from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'

const statisData = [
    { id: 1, title: "Revenue", value: "$78.26M" },
    { id: 2, title: "Profit", value: "$54.15M" },
    { id: 3, title: "Cost", value: "$24.45M" },
    { id: 4, title: "QTY", value: "214K" },
];


export default function Statistics() {
    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3
        h-fit`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    w-[110px] pl-3 border-l-3 border-[#4a7fce]`}>
                        <h3 className='text-md font-mideum text-gray-500'>
                            {data.title}
                        </h3>
                        <p className='text-2xl font-mideum'>
                            <AnimatedNumbers value={data.value} />
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
