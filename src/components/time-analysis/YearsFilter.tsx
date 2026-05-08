"use client";
import React, { useState, useEffect } from 'react';
import { useFilter } from '@/contexts/FilterProvider';

export default function YearsFilter() {
    const { year, setYear } = useFilter();
    const currentYear = new Date().getFullYear().toString();
    const [inputValue, setInputValue] = useState(year?.toString() || currentYear);
    
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

        if (!year) {
            setYear(parseInt(currentYear));
        }

        return () => observer.disconnect();
    }, [year, setYear, currentYear]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 4) {
            setInputValue(value);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const yearVal = parseInt(inputValue);
            if (yearVal > 1900 && yearVal < 2100) {
                setYear(yearVal);
            }
        }
    };

    return (
        <div className={`flex flex-col gap-2 p-4 rounded-lg border transition-all duration-500 
            ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
            
            <label className={`text-sm font-medium uppercase tracking-wider 
                ${isDarkMode ? 'text-white/70' : 'text-[#1e1e1e]'}`}>
                Select Year
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g. 2024"
                    className={`w-full border rounded-md px-4 py-2 transition-all focus:outline-none focus:border-[#0085ff] focus:ring-1 focus:ring-[#0085ff]
                        ${isDarkMode 
                            ? 'bg-white/10 border-white/20 text-white placeholder:text-white/30' 
                            : 'bg-white border-gray-300 text-[#006fff] placeholder:text-gray-400'}`}
                />
                <span className={`absolute right-3 top-2.5 text-[10px] 
                    ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    Press Enter ↵
                </span>
            </div>

            <p className={`text-[10px] italic 
                ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                Enter a specific year to filter data
            </p>
        </div>
    );
}