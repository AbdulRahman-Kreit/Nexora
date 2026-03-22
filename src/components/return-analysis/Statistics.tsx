import React from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'

const statisData = [
    { id: 1, title: "Returns Amount", value: "$6.39M", percentage: "8.1%" },
    { id: 2, title: "QTV Returns", value: "14442", percentage: "6.7%"  },
    { id: 3, title: "Order Returns", value: "1546", percentage: "40.7%"  },
    { id: 4, title: "Customer Returns", value: "336", percentage: "57.17%"  },
];


export default function Statistics() {
    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3
        h-fit`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    pl-3 mr-8 border-l-3 border-[#4a7fce]`}>
                        <h3 className='text-md font-mideum text-gray-500 mb-2'>
                            {data.title}
                        </h3>
                        <div className="flex flex-row gap-4">
                            <p className='text-2xl font-mideum'>
                                <AnimatedNumbers value={data.value} />
                            </p>
                            <p className={`text-2xl font-mideum border-l-2 
                                border-[#4a7fce] pl-4`}>
                                <AnimatedNumbers value={data.percentage} />
                            </p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}
