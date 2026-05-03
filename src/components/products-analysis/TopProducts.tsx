/* eslint-disable react-hooks/purity */
"use client";
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import LoadingSpinner from '../general-components/LoadingSpinner';

interface ProductStat {
    name: string;
    profit?: number;
    gm?: number;
    returns_count?: number;
    total_cost?: number;
}

interface APIResponse {
    most_returned_product: ProductStat;
    top_product_by_profit: ProductStat;
    top_product_by_cost: ProductStat;
    top_product_by_gm: ProductStat;
}

export default function TopProducts() {
    const [stats, setStats] = useState<APIResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFromAPI('get Additional Statics')
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
        </div>
    );

    const cardStyle = `w-[210px] h-[130px] bg-[#006fff] mb-6 mx-0 rounded-2xl text-center relative transition-all duration-300 hover:scale-105 shadow-xl shadow-black/40 overflow-hidden`;
    const headingStyle = `w-full text-[#006fff] font-bold py-2 my-0 mx-auto rounded-t-2xl text-[12px] uppercase shadow-sm`; 
    const miniCardStyle = `flex items-center justify-center w-[180px] px-3 py-2 my-8 text-[#006fff] text-[24px] mx-auto rounded-lg shadow-inner`;

    const cards = [
        { 
            title: "Top Product by Profit", 
            name: stats?.top_product_by_profit.name, 
            suffix: '$', bg: 'bg-white' 
        },
        { 
            title: "Top product by GM", 
            name: stats?.top_product_by_gm.name, 
            suffix: '%', bg: 'bg-white' 
        },
        { 
            title: "Top product by Cost", 
            name: stats?.top_product_by_cost.name, 
            suffix: '$', bg: 'bg-[#2d2d2d]' 
        },
        { 
            title: "Most Returned Product", 
            name: stats?.most_returned_product.name,  
            suffix: 'Qty', bg: 'bg-[#2d2d2d]' 
        },
    ];

    return (
        <div className='flex flex-col justify-center items-center py-4'>
            {cards.map((card, index) => (
                <div key={index} className={cardStyle}>
                    <h3 className={`${headingStyle} ${card.bg}`}>
                        {card.title}
                    </h3>
                    <div className={`${miniCardStyle} ${card.bg}`}>
                        <span className='truncate font-bold text-[13px]'>
                            {card.name || 'N/A'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}