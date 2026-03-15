"use client";
import React from "react";

export default function RevenueAndGMSkeleton() {
    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] ml-1 p-6 h-96 border-l-3 border-[#4a7fce] rounded-r-lg shadow-xl animate-pulse">
            <div className="h-5 w-60 bg-gray-700/50 rounded mb-10"></div>
            <div className="flex items-end justify-between h-[240px] w-full gap-2 px-2">
                {[
                    "h-24", "h-40", "h-48", "h-56", 
                    "h-20", "h-36", "h-44", "h-52", 
                    "h-16", "h-32", "h-40", "h-48"
                ].map((barHeight, index) => (
                    <div 
                        key={index} 
                        className={`flex-1 bg-gray-700/30 rounded-t ${barHeight}`}
                    ></div>
                ))}
            </div>
            <div className="flex justify-between w-full mt-4 px-2">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-2 w-8 bg-gray-700/20 rounded"></div>
                ))}
            </div>
        </div>
    );
}