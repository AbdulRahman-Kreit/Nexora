"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider"; 

export default function Statistics() {
    const [stats, setStats] = useState<any>({});
    const { days } = useFilter();

    useEffect(() => {
        fetchFromAPI('Dashboard Overview/Summary', { days }).then(data => {
            setStats(data || {});
        }).catch(error => {
            console.error(`API Error: ${error}`);
        })
    }, [days]);
    
    const statisData = [
        { id: 1, title: "Revenue", value: stats?.revenue ?? 0, prefix: "$" },
        { id: 2, title: "Profit", value: stats?.profit ?? 0, prefix: "$" },
        { id: 3, title: "Cost", value: stats?.cost ?? 0, prefix: "$" },
    ];
    
    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3 h-fit transition-colors duration-300`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    w-[200px] pl-3 mr-8 border-l-3 border-[#4a7fce]`}>
                        
                        <h3 className='text-sm font-medium text-(--alt-text-color) uppercase tracking-wider mb-2'>
                            {data.title}
                        </h3>

                        <div className="flex flex-row gap-4">
                            <p className='text-2xl font-medium text-(--main-text-color)'>
                                <span>{data.prefix}</span>
                                <AnimatedNumbers value={data.value} />
                            </p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}