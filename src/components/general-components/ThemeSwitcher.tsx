"use client";
import React from 'react';
import { useTheme } from '@/contexts/ThemeProvider';

export default function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col items-center gap-2 font-grotesk">

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
                        pointer-events-none inline-block h-6 w-6 
                        transform rounded-full bg-white 
                        shadow-lg transition duration-300 ease-in-out
                        ${isDarkMode ? 'translate-x-9' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    );
}