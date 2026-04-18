"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";


export default function Statistics() {
    const [stats, setStats] = useState<any>({});
    
    useEffect(() => {
        fetchFromAPI('Customer Analysis/Summary').then(data => {
            
            setStats(data || {});
        }).catch(error => {
            console.error(`API Error: ${error}`);
        })
    }, []);

    const statisData = [
        { id: 1, title: "Customers", value: stats?.customer || "0" },
        { id: 2, title: "AOV", value: `$${stats?.aov}` || "$0" },
        { id: 3, title: "Orders", value: stats?.orders || "0" },
        { id: 4, title: "Customer No Sales", value: stats?.customer_no_sales || "0" },
    ];

    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3
        h-fit`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    w-[150px] pl-3 border-l-3 border-[#4a7fce]`}>
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
