"use client";
import React from 'react';

export default function EmployeeReturnsSkeleton() {
    const skeletonRows = [65, 40, 85, 55, 30, 70, 45, 90, 25, 60];

    return (
        <div 
            className={`
                bg-main-gradient ml-1 
                p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse transition-all duration-500 flex flex-col
            `}
            aria-hidden="true" 
        >
            <div className="h-5 w-48 bg-(--field-bg-color) opacity-50 rounded mb-8"></div>

            <div className="flex-1 flex flex-col justify-between pb-5">
                {skeletonRows.map((width, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        
                        <div className="h-3 w-20 bg-(--field-bg-color) opacity-30 rounded shrink-0"></div>
                        
                        <div className="flex-1 h-5 bg-(--field-bg-color) opacity-10 rounded-sm overflow-hidden relative">
                            <div 
                                className="h-full bg-(--field-bg-color) opacity-40 rounded-sm"
                                style={{ width: `${width}%` }}
                            ></div>
                        </div>


                        <div className="h-3 w-8 bg-(--field-bg-color) opacity-20 rounded shrink-0"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}