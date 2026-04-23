"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReturnButton from '@/components/not-found/ReturnButton';

export default function NotFoundPage() {
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

    return (
        <main className="flex flex-col justify-center items-center h-screen bg-(--main-bg-color)">
            <Image
                src={isDarkMode ? '/assits/Asset_2.png' : '/assits/Asset_1.png'}
                alt='Error - 404'
                width={400}
                height={150}
                priority
                className='object-contain transition-opacity duration-500' 
            />

            <h2 
                className="text-4xl font-semibold my-10 transition-colors duration-500 text-(--main-text-color)"
            >
                Page Not Found
            </h2>

            <ReturnButton />
        </main>
    );
}