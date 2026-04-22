"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

import ThemeSwitcher from './ThemeSwitcher';

export default function PageHeading() {
    const router = useRouter();

    return (
        <div className={`w-full sticky top-0 z-10 h-[57px] flex items-center 
            justify-between px-5 bg-(--main-bg-color) transition-colors duration-300`}>
            
            <button onClick={() => router.back()}
                className="text-(--alt-text-color) hover:text-(--main-text-color) transition-colors" >
                <FontAwesomeIcon icon={faChevronLeft} size='lg' />
            </button>

            <div className={`ml-auto flex items-center justify-end gap-4 
                font-grotesk font-medium h-full`}>

                <ThemeSwitcher />

                <button className={`flex items-center justify-center p-2.5
                    text-(--alt-text-color) hover:text-(--main-text-color) 
                    hover:bg-(--field-bg-color) 
                    rounded-md transition-all`}>
                    <FontAwesomeIcon 
                        icon={faArrowUpFromBracket} 
                        className="text-lg" 
                    />
                </button>
            </div>
        </div>
    );
}