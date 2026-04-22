"use client";
import React from 'react';

export default function ChurnAnalysisSkeleton() {
    return (
        <div 
            className={`
                bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse transition-all duration-500
            `}
            aria-hidden="true"
        >

            <div className="h-4 w-32 bg-(--field-bg-color) opacity-50 rounded-sm mb-8"></div>

            <div className="flex items-end justify-around h-64 w-full px-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col flex-1 items-center gap-2">
                        
                        <div className="w-full max-w-[40px] flex flex-col-reverse gap-1 h-48 bg-(--field-bg-color) opacity-20 rounded-t-sm overflow-hidden">

                            <div className="h-[30%] w-full bg-(--field-bg-color) opacity-60"></div>
                            <div className="h-[40%] w-full bg-(--field-bg-color) opacity-40"></div>
                            <div className="h-[20%] w-full bg-(--field-bg-color) opacity-50"></div>
                        </div>

                        <div className="h-3 w-10 bg-(--field-bg-color) opacity-40 rounded-sm"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};