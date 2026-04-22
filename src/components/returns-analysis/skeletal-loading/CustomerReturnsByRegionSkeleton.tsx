"use client";
import React, { useEffect, useState } from 'react';

export default function CustomerReturnsByRegionSkeleton() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });

        return () => observer.disconnect();
    }, []);

    const skeletonElementColor = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-200';
    const shimmerColor = isDarkMode ? 'via-white/5' : 'via-black/5';

    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse relative overflow-hidden transition-all duration-500`}>
            
            <div className={`h-4 w-64 ${skeletonElementColor} rounded-sm mb-12`}></div>

            <div className="flex items-end justify-between h-56 px-2 gap-3">
                {[...Array(6)].map((_, i) => {
                    const heights = ['33%', '40%', '60%', '50%', '55%', '35%'];

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4">
                            <div className={`h-3 w-6 ${skeletonElementColor} rounded-xs`}></div>
                            
                            <div 
                                className={`w-full max-w-[45px] ${skeletonElementColor} rounded-t-[5px] opacity-70`} 
                                style={{ height: heights[i] }}
                            ></div>
                            
                            <div className={`h-3 w-10 ${skeletonElementColor} rounded-sm mt-2`}></div>
                        </div>
                    );
                })}
        
                <div className={`absolute inset-0 -translate-x-full 
                    animate-[shimmer_2s_infinite] bg-linear-to-r 
                    from-transparent ${shimmerColor} to-transparent`}>
                </div>
            </div>
        </div>
    );
}