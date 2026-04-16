"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function TimelineFilter() {
    const [count, setCount] = useState<number>(7);

    const buttonStyle = `py-1.5 px-3 mr-2 my-2 text-gray-500 rounded duration-200 
    text-md font-semibold hover:bg-[#006fff] hover:text-white`;

    return (
        <div className={`flex flex-row justify-between bottom-0 right-0 
        bg-[#161616] w-full border-t-2 border-gray-500 px-5`}>
            <div>
                <button className={buttonStyle}>
                    Week
                </button>
                <button className={buttonStyle}>
                    Month
                </button>
                <button className={buttonStyle}>
                    Quarter
                </button>
                <button className={buttonStyle}>
                    6M
                </button>
                <button className={buttonStyle}>
                    Year
                </button>
                <button className={buttonStyle}>
                    2Y
                </button>
                <button className={buttonStyle}>
                    5Y
                </button>
                <button className={buttonStyle}>
                    Custom
                </button>
            </div>
            <div className={`flex flex-row min-w-[200px]
                my-2 font-semibold`}>
                <button onClick={() => setCount(count - 7)} 
                className={`p-2 duration-200 hover:bg-[#132741] border-2 
                border-r-0 border-gray-500 rounded-l hover:border-[#006fff]`}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <p className={`w-9/10 border-2 hover:bg-[#132741] border-gray-500 
                hover:border-[#006fff] duration-200 h-full flex justify-center 
                items-center `}>
                    Last {count} Days
                </p>
                <button onClick={() => setCount(count + 7)}
                className={`p-2 duration-200 hover:bg-[#132741] border-2 
                border-l-0 border-gray-500 rounded-r hover:border-[#006fff]`}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}
