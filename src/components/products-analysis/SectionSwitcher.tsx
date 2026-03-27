"use client";
import React, { useState, useEffect } from 'react';
import { faFilter, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopProducts from './TopProducts';

import Filter from './Filter';



export default function SectionSwitcher() {
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [showContent, setShowContent] = useState<boolean>(false); 

    useEffect(() => {
        const saved = localStorage.getItem('isFilterActive');
        if (saved !== null) setIsFilter(JSON.parse(saved));
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    const baseStyle = `p-4 mx-5 mb-5 border-2 rounded-xl duration-200 transition-all`;
    const inactiveStyle = `border-[#2d2d2d] hover:border-[#006fff] hover:bg-[#132741] hover:text-[#006fff]`;
    const activeStyle = `border-[#006fff] bg-[#132741] text-[#006fff]`;

    return (
        <div className='flex flex-col items-end justify-start mt-4 relative'>
            <button 
                onClick={() => setShowContent(!showContent)}
                className="p-3 bg-[#006fff] text-white rounded-full shadow-lg hover:scale-110 transition-transform mb-4"
            >
                <FontAwesomeIcon icon={showContent ? faRankingStar : faFilter} />
            </button>

            {showContent && (
                <div className="bg-[#151a21] p-6 rounded-2xl border border-gray-800 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div className="flex gap-2 mb-6 justify-center">
                        <button onClick={() => setIsFilter(true)}
                            className={`${baseStyle} ${isFilter ? activeStyle : inactiveStyle}`}>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                        <button onClick={() => setIsFilter(false)}
                            className={`${baseStyle} ${!isFilter ? activeStyle : inactiveStyle}`}>
                            <FontAwesomeIcon icon={faRankingStar} />
                        </button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto w-64">
                        {isFilter ? <Filter /> : <TopProducts />}
                    </div>
                </div>
            )}
        </div>
    )
}
