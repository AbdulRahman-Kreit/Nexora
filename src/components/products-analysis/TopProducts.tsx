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

    if (loading) return <div className="text-white">Loading Top Cards...</div>;

    const topProfit = getTopBy('profit');
    const topGM = getTopBy('gm_percent');
    const topRevenue = getTopBy('revenue');
    const topAOV = getTopBy('aov');

    const cardStyle = `w-[200px] h-[160px] bg-[#006fff] mb-5 mx-0 rounded-2xl text-center relative transition-transform hover:scale-105`;
    const headingStyle = `w-full text-[#006fff] font-semibold py-2 my-0 mx-auto rounded-t-2xl text-[13px]`;
    const percentageStyle = `text-4xl text-white font-bold my-4`; 
    const miniCardStyle = `flex items-center justify-center w-[170px] px-2 py-1 my-2 text-[#006fff] text-[10px] mx-auto rounded overflow-hidden`;

    const cards = [
        { title: "Top Product by Profit", data: topProfit, key: 'profit', suffix: '$', bg: 'bg-white' },
        { title: "Top product by GM%", data: topGM, key: 'gm_percent', suffix: '%', bg: 'bg-white' },
        { title: "Top product by Revenue", data: topRevenue, key: 'revenue', suffix: '$', bg: 'bg-[#2d2d2d]' },
        { title: "Top product by AOV", data: topAOV, key: 'aov', suffix: '$', bg: 'bg-[#2d2d2d]' },
    ];

    return (
        <div className='flex flex-col items-center'>
            {cards.map((card, index) => (
                <div key={index} className={cardStyle}>
                    <h3 className={`${headingStyle} ${card.bg}`}>
                        {card.title}
                    </h3>
                    <p className={percentageStyle}>
                        {card.data ? Math.round(parseFloat(card.data[card.key as keyof Product] as string)) : 0}
                        <span className="text-lg ml-1">{card.suffix}</span>
                    </p>
                    <div className={`${miniCardStyle} ${card.bg}`}>
                        <span className='truncate opacity-80 font-semibold text-[14px]'>
                            {card.data?.product}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}