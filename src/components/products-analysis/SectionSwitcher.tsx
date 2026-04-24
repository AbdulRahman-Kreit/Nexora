/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { faFilter, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopProducts from './TopProducts';
import Filter from './Filter';

export default function SectionSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false); 

    useEffect(() => {
        const saved = localStorage.getItem('isFilterActive');
        if (saved !== null) setIsFilter(JSON.parse(saved));
        setIsMounted(true);
    }, [])

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) params.set('category', category);
        else params.delete('category');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleRegionChange = (region: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (region) params.set('region', region);
        else params.delete('region');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (!isMounted) return null;

    // تحديث الأنماط لاستخدام المتغيرات البرمجية بدلاً من الألوان الثابتة
    const baseStyle = `p-4 mx-5 mb-5 border-2 rounded-xl duration-200 transition-all`;
    
    // استخدام var(--field-bg-color) و var(--main-text-color)
    const inactiveStyle = `border-[var(--field-bg-color)] hover:border-[var(--main-text-color)] hover:bg-[var(--bar-bg-filler)] hover:text-[var(--main-text-color)]`;
    const activeStyle = `border-[var(--main-text-color)] bg-[var(--bar-bg-filler)] text-[var(--main-text-color)]`;

    return (
        <div className='flex flex-col items-end justify-start mt-4 absolute right-3'>
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: var(--main-text-color) transparent !important;
                    overflow-y: auto !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--main-text-color);
                    border-radius: 10px;
                }
            `}} />

            <button 
                onClick={() => setShowContent(!showContent)}
                className="p-3 bg-[var(--main-text-color)] text-[var(--main-bg-color)] rounded-full shadow-lg hover:scale-110 transition-transform mb-4"
            >
                <FontAwesomeIcon icon={showContent ? faRankingStar : faFilter} />
            </button>

            {showContent && (
                <div 
                    style={{ backgroundImage: 'var(--background-image-main-gradient)' }}
                    className={`p-8 rounded-2xl border border-[var(--field-bg-color)] 
                    shadow-2xl animate-in fade-in zoom-in duration-300`}
                >
                    <div className="flex gap-2 mb-6 justify-center">
                        <button onClick={() => { setIsFilter(true); localStorage.setItem('isFilterActive', 'true'); }}
                            className={`${baseStyle} ${isFilter ? activeStyle : inactiveStyle}`}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                        <button onClick={() => { setIsFilter(false); localStorage.setItem('isFilterActive', 'false'); }}
                            className={`${baseStyle} ${!isFilter ? activeStyle : inactiveStyle}`}>
                            <FontAwesomeIcon icon={faRankingStar} />
                        </button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto w-64 custom-scrollbar">
                        {isFilter ? (
                            <Filter 
                                onCategoryChange={handleCategoryChange} 
                                onRegionChange={handleRegionChange} 
                            />
                        ) : (
                            <TopProducts />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}