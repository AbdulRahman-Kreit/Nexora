"use client";
import React from 'react';

export default function ProfitAndCustomersSkeleton() {
    return (
        <div 
            className={`
                bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse overflow-hidden relative transition-all duration-500
            `}
            aria-hidden="true"
        >
            <div className="h-4 w-48 bg-(--field-bg-color) opacity-50 rounded-sm mb-6"></div>

            <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-(--field-bg-color) opacity-40"></div>
                    <div className="h-3 w-16 bg-(--field-bg-color) opacity-40 rounded-sm"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-(--field-bg-color) opacity-40"></div>
                    <div className="h-3 w-16 bg-(--field-bg-color) opacity-40 rounded-sm"></div>
                </div>
            </div>

            <div className="relative h-48 w-full px-4 flex items-end justify-between gap-2">
                
                <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
                    <path 
                        d="M0,20 Q100,80 200,40 T400,60 T600,20 T800,50" 
                        fill="none" 
                        stroke="currentColor" 
                        className="text-(--main-text-color)"
                        strokeWidth="2" 
                    />
                </svg>

                {[...Array(10)].map((_, i) => {
                    const height = [80, 70, 60, 45, 45, 30, 30, 15, 30, 15][i];
                    return (
                        <div key={i} className="flex flex-col items-center flex-1 gap-2">
                            <div 
                                className="w-full max-w-[20px] bg-(--field-bg-color) opacity-40 rounded-t-sm" 
                                style={{ height: `${height}%` }}
                            ></div>
                            <div className="h-2 w-8 bg-(--field-bg-color) opacity-20 rounded-sm"></div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-(--main-text-color) opacity-5 to-transparent"></div>
        </div>
    );
}