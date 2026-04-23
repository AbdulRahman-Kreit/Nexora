"use client";
import React, { useState, useEffect } from 'react';

export default function TopProductsbyAOVandGMSkeleton() {
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

    const containerStyle = {
        background: 'var(--background-image-main-gradient)',
    };

    const shapeColor = {
        backgroundColor: 'var(--field-bg-color)',
    };

    const barFillerColor = {
        backgroundColor: 'var(--bar-bg-filler)',
    };

    return (
        <div 
            style={containerStyle}
            className="ml-1 p-6 h-96 border-l-3 border-[#4a7fce] animate-pulse overflow-hidden relative transition-all duration-500"
        >
            {/* Title Placeholder */}
            <div style={shapeColor} className="h-4 w-48 rounded-sm mb-6"></div>

            {/* Legend Placeholder */}
            <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <div style={shapeColor} className="w-3 h-3 rounded-full"></div>
                    <div style={shapeColor} className="h-3 w-16 rounded-sm"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div style={shapeColor} className="w-3 h-3 rounded-full"></div>
                    <div style={shapeColor} className="h-3 w-16 rounded-sm"></div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-48 w-full px-4 flex items-end justify-between gap-2">
                
                {/* Line */}
                <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
                    <path 
                        d="M0,20 Q100,80 200,40 T400,60 T600,20 T800,50" 
                        fill="none" 
                        stroke={isDarkMode ? "#4a7fce" : "#006fff"} 
                        strokeWidth="2" 
                    />
                </svg>

                {[...Array(10)].map((_, i) => {
                    const height = [80, 70, 60, 45, 45, 30, 30, 15, 30, 15][i];
                    return (
                        <div key={i} className="flex flex-col items-center flex-1 gap-2">
                            <div 
                                style={barFillerColor}
                                className="w-full max-w-[20px] rounded-t-sm" 
                                style={{ ...barFillerColor, height: `${height}%` }}
                            ></div>
                            <div style={shapeColor} className="h-2 w-8 rounded-sm"></div>
                        </div>
                    );
                })}
            </div>

            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
    );
}