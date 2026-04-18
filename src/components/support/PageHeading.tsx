"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


export default function PageHeading() {
    const router = useRouter();

    return (
        <div className={`w-full sticky top-0 z-10 h-[57px] flex items-center 
        justify-between px-5`}>
            <button onClick={() => router.back()}
                className="text-gray-400 hover:text-white" >
                <FontAwesomeIcon icon={faChevronLeft} size='lg' />
            </button>
        </div>
    );
}
