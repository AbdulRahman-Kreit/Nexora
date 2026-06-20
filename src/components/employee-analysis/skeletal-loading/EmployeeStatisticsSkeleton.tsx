import React from 'react'

export default function EmployeeStatisticsSkeleton() {
    return (
        <div className="bg-[#006fff] p-6 h-200 flex flex-col shadow-2xl text-white rounded-xl relative overflow-hidden animate-pulse">
            <div className="w-full">
                {[...Array(16)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex items-center py-4 px-4 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                    >
                        <div className="w-[25%] flex items-center gap-2">
                            <div className="w-3 h-3 bg-white/20 rounded-full"></div> {/* أيقونة السهم */}
                            <div className="h-4 bg-white/20 rounded w-16"></div>
                        </div>
                        
                        <div className="w-[25%] flex justify-center">
                            <div className="h-4 bg-white/20 rounded w-20"></div>
                        </div>
                        
                        <div className="w-[25%] flex justify-center">
                            <div className="h-4 bg-white/20 rounded w-12"></div>
                        </div>
                        
                        <div className="w-[25%] flex justify-end">
                            <div className="h-4 bg-white/20 rounded w-24"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}