"use client";
import React, { useState } from 'react';
import { faChevronUp, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    const labelArray: string[] = ["Saas Design 1", "Saas Design 2", "Saas Design 3"];
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const goUp = () => {
        setCurrentIndex(prev => (prev + 1) % labelArray.length);
    }
    const goDown = () => {
        setCurrentIndex(prev => (prev - 1 + labelArray.length) % labelArray.length);
    }


    return (
        <div className={`flex flex-row items-stretch border-b border-[#2d2d2d] 
            w-full h-[57px]`}> 
            <div className="flex items-center px-3">
                <div className={`p-1.5 bg-white rounded-lg w-8 h-8 flex 
                    items-center justify-center`}>
                    <img 
                        src="/assits/icons/tabler-icon-building.png" 
                        alt="Building" 
                        className="w-5 h-5 object-contain" 
                    />
                </div>
            </div>

            <div className={`flex flex-row items-center flex-1 px-2 
                hover:bg-[#161616] transition-colors group`}>
                <span className={`font-semibold text-sm text-gray-100 
                    truncate max-w-[120px] font-grotesk`}>
                    {labelArray[currentIndex]}
                </span>
                
                <div className={`flex flex-col ml-auto mr-2 text-[10px] 
                    text-gray-600 gap-0 opacity-60 group-hover:opacity-100`}>
                    <button onClick={goUp} 
                    className="hover:text-white leading-tight">
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                    <button onClick={goDown} 
                    className="hover:text-white leading-tight">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>

            <button className="border-l border-[#2d2d2d] px-5 flex items-center justify-center hover:bg-[#1e1e1e] transition-colors text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            </button>
        </div> 
    )
}
