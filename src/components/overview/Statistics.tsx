"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useFilter } from "@/contexts/FilterProvider";

interface StatsData {
    revenue: number;
    cost: number;
    profit: number;
    quantity: number;
}

export default function Statistics() {
    const [stats, setStats] = useState<StatsData>({
        revenue: 0,
        cost: 0,
        profit: 0,
        quantity: 0
    });
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
        { id: 4, title: "QTY", value: stats?.quantity ?? 0, prefix: "" },
    ];

    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3 h-fit gap-6 transition-colors duration-300`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start min-w-27.5 pl-4 border-l-3 border-[#4a7fce]`}>

                        <h3 className='text-sm font-medium text-(--alt-text-color) uppercase tracking-wider'>
                            {data.title}
                        </h3>

                        <div className='text-2xl font-medium text-(--main-text-color) flex items-center'>
                            <span>{data.prefix}</span>
                            <AnimatedNumbers value={data.value} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}