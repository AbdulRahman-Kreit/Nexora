"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronDown, faFileCirclePlus, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';


export default function PageHeading() {
    const router = useRouter();

    return (
        <div className={`w-full sticky top-0 z-10 h-[57px] flex items-center 
        justify-between px-5`}>
            <button onClick={() => router.back()}
                className="text-gray-400 hover:text-white" >
                <FontAwesomeIcon icon={faChevronLeft} size='lg' />
            </button>

            <div className={`ml-auto flex items-center justify-end gap-4 
            font-grotesk font-medium h-full`}>

                <button className={`flex items-center justify-center 
                    bg-transparent border-2 border-[#2d2d2d] mx-3
                    hover:border-[#006fff] hover:bg-[#132741] py-1.5 px-3 rounded-lg text-white 
                    transition-all group`}>
                    <FontAwesomeIcon 
                        icon={faFileCirclePlus} 
                    className={`text-[13px] text-gray-400 
                    group-hover:text-white transition-colors`} 
                    />
                    <span className={`ml-3 text-md font-semibold 
                        whitespace-nowrap`}>
                        Add to report
                    </span>
                </button>

                <button className={`flex items-center justify-center p-2.5
                    text-gray-500 hover:text-white hover:bg-[#1e1e1e] 
                    rounded-md transition-all`}>
                    <FontAwesomeIcon 
                        icon={faArrowUpFromBracket} 
                        className="text-lg" 
                    />
                </button>
            </div>
        </div>
    );
}
