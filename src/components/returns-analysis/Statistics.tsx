"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";

export default function Statistics() {
    const [stats, setStats] = useState<any>({});

    useEffect(() => {
        fetchFromAPI('Returns Analysis/Summary')
            .then(data => {
                setStats(data || {});
            })
            .catch(error => {
                console.error(`API Error: ${error}`);
            });
    }, []);

    const statisData = [
        { id: 1, title: "Returns Amount", value: stats.returns_amount ?? 0, percentage: stats.returns_amount_percent ?? 0},
        { id: 2, title: "QTY Returns", value: stats.qty_returns ?? 0, percentage: stats.qty_returns_percent ?? 0},
        { id: 3, title: "Order Returns", value: stats.order_returns ?? 0, percentage: stats.order_returns_percent ?? 0},
        { id: 4, title: "Customer Returns", value: stats.customer_returns ?? 0, percentage: stats.customer_returns_percent ?? 0},
    ];

    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3 h-fit transition-colors duration-500`}>
                    {statisData.map((data) => {
                        return (
                            <div key={data.id} className={`flex flex-col justify-start 
                            w-[200px] pl-3 border-l-3 border-[#4a7fce]`}>
                                
                                <h3 className='text-md font-medium text-(--alt-text-color) uppercase tracking-wider opacity-80'>
                                    {data.title}
                                </h3>
        
                                <p className='text-2xl font-medium text-(--main-text-color)'>
                                    <span>{data.prefix}</span>
                                    <AnimatedNumbers value={data.value} />
                                </p>
                            </div>
                        )
                    })}
                </div>
    )
}