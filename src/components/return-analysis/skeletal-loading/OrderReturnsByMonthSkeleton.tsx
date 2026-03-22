import React from 'react'

export default function OrderReturnsByMonthSkeleton() {
    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse">
            <div className="h-4 w-48 bg-gray-700 rounded mb-8"></div>

            <div className="relative h-[250px] w-full flex items-end justify-between px-2">
                <div className="absolute left-0 h-full flex flex-col justify-between py-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-3 w-6 bg-gray-800 rounded"></div>
                ))}
                </div>

                <div className="flex items-end justify-around w-full ml-10 h-full">
                {[60, 40, 30, 45, 80, 20, 50, 70, 40, 65, 55, 40].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full">
                    <div 
                        className="w-1 bg-gray-800 rounded-t" 
                        style={{ height: `${height}%` }}
                    ></div>
                    {/* X-Axis Ticks */}
                    <div className="h-3 w-8 bg-gray-800 rounded mt-2"></div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}
