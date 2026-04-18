"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";

export default function Statistics() {
    const [stats, setStats] = useState<any>({});
    
    useEffect(() => {
        fetchFromAPI('Time Analysis/Summary').then(data => {
            
            setStats(data || {});
        }).catch(error => {
            console.error(`API Error: ${error}`);
        })
    }, []);
    
    const statisData = [
        { id: 1, title: "Revenue", value: `$${78870000}` },
        { id: 2, title: "Profit", value: `$${54170000}`  },
        { id: 3, title: "Cost", value: `$${24700000}` },
    ];
    
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
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}
