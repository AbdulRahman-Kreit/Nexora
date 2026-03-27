import React from 'react';

export default function CostAndGMSkeleton() {
    return (
        <div className="bg-[#151a21] ml-1 p-4 h-96 border-l-3 border-gray-700 animate-pulse">

            <div className="h-4 w-48 bg-gray-700 rounded-md mb-8"></div>
            
            <div className="relative flex items-end justify-around h-64 w-full px-4">
                
                <div className="w-8 bg-gray-800 rounded-t-md h-4/5"></div>
                <div className="w-8 bg-gray-800 rounded-t-md h-2/5"></div>
                <div className="w-8 bg-gray-800 rounded-t-md h-1/5"></div>
                
                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-700/50"></div>
            </div>

            <div className="flex justify-around mt-6">
                <div className="h-3 w-12 bg-gray-800 rounded"></div>
                <div className="h-3 w-12 bg-gray-800 rounded"></div>
                <div className="h-3 w-12 bg-gray-800 rounded"></div>
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                    <div className="h-2 w-10 bg-gray-700 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                    <div className="h-2 w-10 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    );
}