"use client";
import React from 'react';

export default function RevenueByCategorySkeleton() {
    return (
        <div 
            className={`
                bg-main-gradient ml-1 
                p-6 h-96 border-l-3 border-[#4a7fce] 
                animate-pulse transition-all duration-500
            `}
            aria-hidden="true" 
        >
            <div className="h-5 w-48 bg-(--field-bg-color) opacity-50 rounded mb-10"></div>

            <div className="flex items-end justify-between h-[280px] w-full gap-4 px-4">
                {[
                    { h: 'h-[80%]', w: 'w-10' }, 
                    { h: 'h-[35%]', w: 'w-10' }, 
                    { h: 'h-[60%]', w: 'w-10' }, 
                    { h: 'h-[30%]', w: 'w-10' }, 
                    { h: 'h-[15%]', w: 'w-10' }, 
                ].map((bar, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div className="h-4 w-12 bg-(--field-bg-color) opacity-30 rounded mb-2"></div>
                        <div 
                            className={`
                                bg-(--field-bg-color) opacity-40 rounded-t 
                                ${bar.h} 
                                ${bar.w} 
                            `}
                        ></div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between w-full mt-4 px-4 gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 flex-1 bg-(--field-bg-color) opacity-20 rounded mx-1"></div>
                ))}
            </div>
        </div>
    )
}