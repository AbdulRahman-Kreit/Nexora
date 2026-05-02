"use client";
import React from "react";

export default function RevenueByBusinessSkeleton() {
    return (
        <div 
            className={`
                bg-main-gradient p-6 h-96 border-l-3 border-[#4a7fce] 
                rounded-r-lg animate-pulse shadow-xl transition-all duration-500
            `}
            aria-hidden="true"
        >
            <div className="h-4 w-40 bg-(--field-bg-color) opacity-50 rounded mb-8"></div>
            
            <div className="flex flex-col items-center justify-center">
                <div 
                    className="relative w-[180px] h-[180px] rounded-full border-[25px] border-(--field-bg-color) opacity-30 flex items-center justify-center"
                >
                    <div className="w-full h-full rounded-full border-[1px] border-(--field-bg-color) opacity-10"></div>
                </div>

                <div className="flex justify-center gap-4 mt-10 w-full">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-(--field-bg-color) opacity-40"></div>
                            <div className="h-3 w-16 bg-(--field-bg-color) opacity-30 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}