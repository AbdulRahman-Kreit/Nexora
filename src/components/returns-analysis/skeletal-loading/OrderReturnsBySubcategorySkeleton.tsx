import React from 'react'

export default function OrderReturnsBySubcategorySkeleton() {
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse relative 
        overflow-hidden`}>
        
            <div className="h-4 w-64 bg-[#1a1a1a] rounded-sm mb-12"></div>

            <div className="flex items-end justify-between h-56 px-2 gap-3">
                {[...Array(12)].map((_, i) => {
                const heights = ['60%', '50%', '55%', '35%', '60%', '85%', '65%', '58%', '40%', '30%', '40%', '30%'];
                
                return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4">

                        <div className="h-3 w-6 bg-[#1a1a1a] rounded-xs"></div>
                        
                        <div 
                            className="w-full max-w-[20px] bg-[#1a1a1a] rounded-t-[5px]" 
                            style={{ height: heights[i] }}
                        ></div>
                        
                        <div className="h-3 w-10 bg-[#1a1a1a] rounded-sm mt-2"></div>
                    </div>
                );
                })}
            </div>

            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
    )
}
