"use client";
import React from 'react';

export default function RevenueByCountrySkeleton() {
    return (
        <div 
            className={`
                bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse transition-all duration-500
            `}
            aria-hidden="true"
        >
            <div className="h-5 w-48 bg-(--field-bg-color) opacity-50 rounded mb-8"></div>
            
            <div className="flex flex-col justify-between h-[260px] w-full pr-10">
                {[
                    { labelWidth: 'w-20', barWidth: 'w-[65%]' }, 
                    { labelWidth: 'w-16', barWidth: 'w-[30%]' }, 
                    { labelWidth: 'w-14', barWidth: 'w-[15%]' }, 
                    { labelWidth: 'w-24', barWidth: 'w-[12%]' }, 
                    { labelWidth: 'w-16', barWidth: 'w-[8%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[8%]' },  
                ].map((item, index) => (
                    <div key={index} className="flex items-center w-full gap-4">

                        <div className={`h-3 ${item.labelWidth} bg-(--field-bg-color) opacity-40 rounded`}></div>
                        
                        <div className="relative flex-1 h-[25px]">
                            
                            <div className="absolute inset-0 bg-(--bar-bg-filler) opacity-50 rounded-[5px]"></div>
                            
                            <div className={`absolute left-0 top-0 h-full ${item.barWidth} bg-[#006fff] opacity-30 rounded-[5px]`}></div>
                        </div>

                        <div className="h-3 w-8 bg-(--field-bg-color) opacity-30 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}