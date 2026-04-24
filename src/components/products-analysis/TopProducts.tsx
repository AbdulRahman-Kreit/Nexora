/* eslint-disable react-hooks/purity */
"use client";
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '@/data/fetchFromAPI';

interface Product {
    product: string;
    revenue: string;
    profit: string;
    aov: string;
    gm_percent: string;
}

export default function TopProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFromAPI('Top Products')
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const getTopBy = (key: keyof Product) => {
        if (products.length === 0) return null;
        return products.reduce((prev, current) => 
            (parseFloat(current[key] as string) > parseFloat(prev[key] as string)) ? current : prev
        );
    };

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-[#006fff] font-semibold">
                Loading Top Products...
            </div>
        </div>
    );

    const topProfit = getTopBy('profit');
    const topGM = getTopBy('gm_percent');
    const topRevenue = getTopBy('revenue');
    const topAOV = getTopBy('aov');

    const cardStyle = `w-[210px] h-[165px] bg-[#006fff] mb-6 mx-0 rounded-2xl text-center relative transition-all duration-300 hover:scale-105 shadow-xl shadow-black/40 overflow-hidden`;
    const headingStyle = `w-full text-[#006fff] font-bold py-2 my-0 mx-auto rounded-t-2xl text-[12px] uppercase shadow-sm`;
    const percentageStyle = `text-4xl text-white font-black my-4 drop-shadow-md`; 
    const miniCardStyle = `flex items-center justify-center w-[180px] px-2 py-1.5 my-2 text-[#006fff] text-[11px] mx-auto rounded-lg shadow-inner`;

    const cards = [
        { title: "Top Product by Profit", data: topProfit, key: 'profit', suffix: '$', bg: 'bg-white' },
        { title: "Top product by GM%", data: topGM, key: 'gm_percent', suffix: '%', bg: 'bg-white' },
        { title: "Top product by Revenue", data: topRevenue, key: 'revenue', suffix: '$', bg: 'bg-[#2d2d2d]' },
        { title: "Top product by AOV", data: topAOV, key: 'aov', suffix: '$', bg: 'bg-[#2d2d2d]' },
    ];

    return (
        <div className='flex flex-col items-center py-4'>
            {cards.map((card, index) => (
                <div key={index} className={cardStyle}>
                    <h3 className={`${headingStyle} ${card.bg}`}>
                        {card.title}
                    </h3>
                    <p className={percentageStyle}>
                        {card.data ? Math.round(parseFloat(card.data[card.key as keyof Product] as string)) : 0}
                        <span className="text-lg ml-1 opacity-80">{card.suffix}</span>
                    </p>
                    <div className={`${miniCardStyle} ${card.bg}`}>
                        <span className='truncate font-bold text-[13px]'>
                            {card.data?.product || 'N/A'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}