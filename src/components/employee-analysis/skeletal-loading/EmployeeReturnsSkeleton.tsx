import React from 'react'

export default function EmployeeReturnsSkeleton() {
    const skeletonRows = Array.from({ length: 10 });

    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
            p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse flex flex-col">
            
            <div className="h-4 w-48 bg-gray-700 rounded mb-6"></div>

            <div className="flex-1 flex flex-col justify-between pb-5">
                {skeletonRows.map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="h-3 w-20 bg-[#12243c] rounded shrink-0"></div>
                        
                        <div className="flex-1 h-5 bg-[#12243c] rounded-sm overflow-hidden relative">

                            <div 
                                className="h-full bg-[#1c355a] rounded-sm opacity-50"
                                style={{ width: `${Math.random() * 50 + 20}%` }}
                            ></div>
                        </div>

                        <div className="h-3 w-8 bg-[#12243c] rounded shrink-0"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
