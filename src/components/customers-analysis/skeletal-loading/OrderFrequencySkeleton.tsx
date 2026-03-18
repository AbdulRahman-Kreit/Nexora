"use client";
import React from 'react';

export default function OrderFrequencySkeleton() {
    const skeletonBars = [
        'h-[30%]', 'h-[25%]', 'h-[40%]', 'h-[90%]', 'h-[25%]', 
        'h-[26%]', 'h-[35%]', 'h-[70%]', 'h-[15%]', 'h-[12%]', 
        'h-[15%]', 'h-[50%]'
    ];

    return (
        <div 
            className={`
                bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
                p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse flex flex-col
            `}
            aria-hidden="true" 
        >
            <div className="h-5 w-40 bg-gray-700/50 rounded mb-8"></div>

            <div className="flex flex-1 w-full gap-2 relative">
                

                <div className="absolute -left-2 top-1/2 -rotate-90 origin-left text-[10px] w-20 h-3 bg-gray-700/20 rounded"></div>

                <div className="flex items-end justify-between w-full h-[240px] px-2 gap-1 border-b border-gray-700/30">
                    {skeletonBars.map((barHeight, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 group">
                            
                            <div className="h-3 w-6 bg-gray-700/20 rounded mb-2"></div>
                            
                            <div 
                                className={`
                                    bg-gray-700/40 rounded-t-sm 
                                    w-[20px] sm:w-[28px]
                                    ${barHeight} 
                                `}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center mt-2">
                <div className="flex justify-between w-full px-4 mb-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-2 w-4 bg-gray-700/10 rounded"></div>
                    ))}
                </div>
                <div className="h-3 w-24 bg-gray-700/30 rounded"></div>
            </div>
        </div>
    )
}