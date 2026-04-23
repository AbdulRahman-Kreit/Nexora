"use client";
import React from 'react';

export default function TopProductsbyTotalOrdersSkeleton() {
    const containerStyle = {
        background: 'var(--background-image-main-gradient)',
    };

    const labelPlaceholderStyle = {
        backgroundColor: 'var(--field-bg-color)',
    };

    const bgBarPlaceholderStyle = {
        backgroundColor: 'var(--bar-bg-filler)',
    };

    return (
        <div 
            style={containerStyle}
            className="ml-1 p-6 h-2/3 border-l-3 border-[#4a7fce] animate-pulse transition-all duration-500"
        >
            {/* Title Placeholder */}
            <div style={labelPlaceholderStyle} className="h-5 w-48 rounded mb-8 opacity-50"></div>
            
            <div className="flex flex-col justify-between h-[calc(100%-60px)] w-full pr-10 py-5">
                {[
                    { labelWidth: 'w-20', barWidth: 'w-[65%]' }, 
                    { labelWidth: 'w-16', barWidth: 'w-[30%]' }, 
                    { labelWidth: 'w-14', barWidth: 'w-[15%]' }, 
                    { labelWidth: 'w-24', barWidth: 'w-[12%]' }, 
                    { labelWidth: 'w-16', barWidth: 'w-[8%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[44%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[5%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[62%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[7%]' },  
                    { labelWidth: 'w-14', barWidth: 'w-[19%]' },  
                ].map((item, index) => (
                    <div key={index} className="flex items-center w-full gap-4">
                        
                        {/* Y-Axis Label Placeholder */}
                        <div 
                            className={`h-3 ${item.labelWidth} rounded opacity-40`} 
                            style={labelPlaceholderStyle}
                        ></div>
                        
                        {/* Horizontal Bar Placeholder */}
                        <div className="relative flex-1 h-[18px]"> 
                            {/* Background Bar (Total Capacity) */}
                            <div 
                                style={bgBarPlaceholderStyle}
                                className="absolute inset-0 rounded-[5px] opacity-50"
                            ></div>
                            
                            {/* Foreground Bar (Value) */}
                            <div 
                                className={`absolute left-0 top-0 h-full ${item.barWidth} bg-[#006fff]/30 rounded-[5px]`}
                            ></div>
                        </div>

                        {/* Value/Percentage Placeholder */}
                        <div style={labelPlaceholderStyle} className="h-3 w-8 rounded opacity-30"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}