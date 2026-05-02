import React from 'react'

export default function RevenueOverTimeSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i} 
                    className={`flex items-center py-4 px-4 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                >
                    {/* Year/ Month Column */}
                    <div className="w-[25%] flex items-center gap-2">
                        <div className="w-3 h-3 bg-white/20 rounded-full"></div> 
                        <div className="h-4 bg-white/20 rounded w-16"></div>
                    </div>
                    
                    {/* Revenue Column */}
                    <div className="w-[25%] flex justify-center">
                        <div className="h-4 bg-white/20 rounded w-20"></div>
                    </div>
                    
                    {/* MOM Column */}
                    <div className="w-[25%] flex justify-center">
                        <div className="h-4 bg-white/20 rounded w-12"></div>
                    </div>
                    
                    {/* Variance Column */}
                    <div className="w-[25%] flex justify-end">
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
