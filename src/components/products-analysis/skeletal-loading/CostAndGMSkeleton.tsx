"use client";
import React, { useState, useEffect } from 'react';

export default function CostAndGMSkeleton() {
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

    const themeStyles = {
        container: {
            background: 'var(--background-image-main-gradient)',
        },
        primaryShape: {
            backgroundColor: 'var(--field-bg-color)',
        },
        secondaryShape: {
            backgroundColor: 'var(--bar-bg-filler)',
        },
        lineStroke: {
            backgroundColor: isDarkMode ? 'rgba(118, 118, 118, 0.2)' : 'rgba(30, 30, 30, 0.1)',
        }
    };

    return (
        <div 
            style={themeStyles.container}
            className="ml-1 p-4 h-96 border-l-3 border-[#4a7fce] animate-pulse transition-all duration-500"
        >
            {/* Title Placeholder */}
            <div 
                style={themeStyles.primaryShape}
                className="h-4 w-48 rounded-md mb-8"
            ></div>
            
            {/* Chart Area Placeholder */}
            <div className="relative flex items-end justify-around h-64 w-full px-4">
                <div style={themeStyles.secondaryShape} className="w-8 rounded-t-md h-4/5"></div>
                <div style={themeStyles.secondaryShape} className="w-8 rounded-t-md h-2/5"></div>
                <div style={themeStyles.secondaryShape} className="w-8 rounded-t-md h-1/5"></div>
                
                {/* Horizontal Line Placeholder */}
                <div 
                    style={themeStyles.lineStroke}
                    className="absolute top-1/2 left-0 w-full h-px"
                ></div>
            </div>

            {/* X-Axis Labels Placeholder */}
            <div className="flex justify-around mt-6">
                <div style={themeStyles.secondaryShape} className="h-3 w-12 rounded"></div>
                <div style={themeStyles.secondaryShape} className="h-3 w-12 rounded"></div>
                <div style={themeStyles.secondaryShape} className="h-3 w-12 rounded"></div>
            </div>
            
            {/* Legend Placeholder */}
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div style={themeStyles.primaryShape} className="w-3 h-3 rounded-full"></div>
                    <div style={themeStyles.primaryShape} className="h-2 w-10 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div style={themeStyles.primaryShape} className="w-3 h-3 rounded-full"></div>
                    <div style={themeStyles.primaryShape} className="h-2 w-10 rounded"></div>
                </div>
            </div>
        </div>
    );
}