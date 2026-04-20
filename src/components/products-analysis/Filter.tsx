"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';

interface FilterProps {
    onCategoryChange?: (category: string) => void;
}

export default function Filter({ onCategoryChange }: FilterProps) {
    // قراءة الفئة المختارة حالياً من الرابط لضمان بقاء الزر مفعلاً عند تحديث الصفحة
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || '';

    const categoriesInputs = [
        { id: 'all-categories', label: 'All Categories', value: '' },
        { id: 'amino', label: 'Amino Acids', value: 'Amino Acids' },
        { id: 'carbs', label: 'Carbs', value: 'Carbs' },
        { id: 'protein', label: 'Protein', value: 'Protein' },
        { id: 'clothing', label: 'Clothing', value: 'Clothing' },
    ];

    const regionsInputs = [
        { id: 'all-regions', label: 'All Regions' },
        { id: 'brazil', label: 'Brazil' },
        { id: 'canada', label: 'Canada' },
        { id: 'central', label: 'Central' },
        { id: 'france', label: 'France' },
        { id: 'northeast', label: 'Saudi Arabia' },
        { id: 'northwest', label: 'Australia' },
        { id: 'southeast', label: 'Japan' },
    ];

    const cardStyle = `flex flex-col w-[230px] bg-[#006fff] mb-5 mx-0 
    rounded-2xl text-center relative`;
    const headingStyle = `w-full text-[#006fff] font-semibold py-2 text-lg
    my-0 mx-auto rounded-t-2xl`;

    return (
        <div className='flex flex-col justify-center items-center'>
            {/* Categories Section */}
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-white`}>
                    Categories
                </h3>
                {categoriesInputs.map((item, index) => {
                    return (
                        <label 
                            key={index} 
                            className="flex flex-row items-center mx-5 cursor-pointer group"
                        >
                            <input 
                                type="radio" 
                                name="category"
                                id={item.id}
                                className="peer hidden"
                                checked={currentCategory === item.value}
                                onChange={() => onCategoryChange?.(item.value)}
                            />
                            <div className="w-5 h-5 rounded-full border-2 border-[#0085ff] bg-white 
                                transition-all duration-200
                                peer-checked:shadow-[0_0_10px_rgba(0,133,255,0.5)]
                                peer-checked:bg-[#69b4ff]">
                            </div>
                            
                            <span className="m-2 text-lg font-semibold text-white">
                                {item.label}
                            </span>
                        </label>
                    )
                })}
            </div>
            
            {/* Regions Section */}
            <div className={cardStyle}>
                <h3 className={`${headingStyle} bg-[#2d2d2d]`}>
                    Regions
                </h3>
                {regionsInputs.map((item, index) => {
                    return (
                        <label key={index} className="flex flex-row items-center mx-5 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="regions"
                                id={item.id}
                                className="peer hidden"
                                defaultChecked={item.id === 'all-regions'} 
                            />
                            <div className="w-5 h-5 rounded-full border-2 border-[#0085ff] bg-white 
                                transition-all duration-200
                                peer-checked:shadow-[0_0_10px_rgba(0,133,255,0.5)]
                                peer-checked:bg-[#69b4ff]">
                            </div>
                            
                            <span className="m-2 text-lg font-semibold text-white">
                                {item.label}
                            </span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}