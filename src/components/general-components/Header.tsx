"use client"; 
import React, { useEffect, useState } from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserName(user.name); 
            } catch (error) {
                console.error("Error parsing user data", error);
            }
        }
    }, []);

    return (
        <div className={`flex flex-row items-stretch border-b border-(--field-bg-color) 
            w-full h-[57px] transition-colors duration-300`}> 
            
            <div className="flex items-center px-3">
                <div className={`p-1.5 bg-(--main-text-color) rounded-lg w-8 h-8 flex 
                    items-center justify-center transition-colors duration-300`}>
                    <FontAwesomeIcon icon={faBuilding} className="text-(--main-bg-color) text-xl" />
                </div>
            </div>

            <div className={`flex flex-row items-center flex-1 px-2 
                hover:bg-(--field-bg-color) transition-colors group cursor-default`}>
                <span className={`font-semibold text-sm text-(--main-text-color) 
                    truncate max-w-[120px] font-grotesk`}>
                    {userName || 'Guest'} 
                </span>
            </div>
        </div> 
    )
}