"use client";
import React from 'react';
import { useTheme } from '@/contexts/ThemeProvider';

export default function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col items-center gap-2 font-grotesk">
            {/* إضافة رابط مكتبة Font Awesome برمجياً لضمان ظهور الأيقونات */}
            <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
            />

            <button
                onClick={toggleTheme}
                className={`
                    relative inline-flex h-7 w-16 flex-shrink-0 cursor-pointer 
                    rounded-full border-2 border-transparent 
                    transition-colors duration-300 ease-in-out 
                    outline-none 
                    ${isDarkMode ? 'bg-[#006fff]' : 'bg-[#e5e7eb]'}
                `}
                role="switch"
                aria-checked={isDarkMode}
            >
                <span className="sr-only">Toggle theme</span>
                
                <span
                    aria-hidden="true"
                    className={`
                        pointer-events-none flex items-center justify-center h-6 w-6 
                        transform rounded-full  
                        shadow-lg transition duration-300 ease-in-out
                        ${isDarkMode ? 'translate-x-9 bg-white' : 'translate-x-0 bg-[#006fff]'}
                    `}
                >
                    {isDarkMode ? (
                        <i className="fas fa-moon text-[#006fff] text-[12px]"></i>
                    ) : (
                        <i className="fas fa-sun text-white text-[12px]"></i>
                    )}
                </span>
            </button>
        </div>
    );
}