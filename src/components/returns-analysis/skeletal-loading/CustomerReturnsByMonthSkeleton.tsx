"use client";
import React, { useEffect, useState } from 'react';

export default function CustomerReturnsByMonthSkeleton() {
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

    const barColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
    const labelColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';

    return (
        <div className="bg-main-gradient p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse transition-colors duration-500">
            <div className={`h-4 w-48 ${labelColor} rounded mb-8`}></div>

            <div className="relative h-[250px] w-full flex items-end justify-between px-2">
                <div className="absolute left-0 h-full flex flex-col justify-between py-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-3 w-6 ${barColor} rounded`}></div>
                    ))}
                </div>

                <div className="flex items-end justify-around w-full ml-10 h-full">
                    {[60, 40, 30, 45, 80, 20, 50, 70, 40, 65, 55, 40].map((height, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-full">
                            <div 
                                className={`w-1 ${barColor} rounded-t opacity-50`} 
                                style={{ height: `${height}%` }}
                            ></div>
                            <div className={`h-3 w-8 ${barColor} rounded mt-2`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}