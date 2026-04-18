"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers';
import { fetchFromAPI } from '@/data/fetchFromAPI';

export default function Statistics() {
    const [stats, setStats] = useState<any>({});

    useEffect(() => {
        fetchFromAPI('Dashboard Overview/Summary').then(data => {
            
            setStats(data || {});
        }).catch(error => {
            console.error(`API Error: ${error}`);
        })
    }, []);

    const statisData = [
    { id: 1, title: "Revenue", value: `$${stats?.revenue}` || "0" },
    { id: 2, title: "Profit", value: `$${stats?.profit}` || "0" },
    { id: 3, title: "Cost", value: `$${stats?.cost}` || "0" },
    { id: 4, title: "QTY", value: `${stats?.quantity}` || "0" },
    ];

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
