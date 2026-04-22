"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";

export default function Statistics() {
    const [stats, setStats] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFromAPI('Returns Analysis/Summary')
            .then(data => {
                setStats(data || {});
                setLoading(false);
            })
            .catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            });
    }, []);

    const statisData = [
        { id: 1, title: "Returns Amount", value: stats.returns_amount, percentage: `${stats.returns_amount_percent}%` },
        { id: 2, title: "QTV Returns", value: stats.qty_returns, percentage: `${stats.qty_returns_percent}%` },
        { id: 3, title: "Order Returns", value: stats.order_returns, percentage: `${stats.order_returns_percent}%` },
        { id: 4, title: "Customer Returns", value: stats.customer_returns, percentage: `${stats.customer_returns_percent}%` },
    ];

    if (loading) return <div className="h-20 animate-pulse bg-transparent" />;

    return (
        <div className="flex flex-row justify-between font-grotesk max-w-2/3 h-fit transition-all duration-500">
            {statisData.map((data) => {
                return (
                    <div 
                        key={data.id} 
                        className="flex flex-col justify-start pl-3 mr-8 border-l-3 border-[#4a7fce] transition-colors duration-500"
                    >
                        <h3 className="text-md font-medium text-(--alt-text-color) mb-2">
                            {data.title}
                        </h3>
                        
                        <div className="flex flex-row gap-4 items-baseline">
                            <p className="text-2xl font-medium text-(--main-text-color)">
                                <AnimatedNumbers value={data.value} />
                            </p>
                            
                            <p className="text-2xl font-medium border-l-2 border-[#4a7fce] pl-4 text-(--main-text-color)">
                                <AnimatedNumbers value={data.percentage} />
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}