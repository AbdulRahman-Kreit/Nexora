"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReturnButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}
        className={`px-6 py-5 bg-[#006fff] text-white rounded-md group`}>
            <FontAwesomeIcon icon={faArrowRotateRight}
            className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
            <span className='ml-3 font-semibold'>Return to the page</span>
        </button>
    )
}
