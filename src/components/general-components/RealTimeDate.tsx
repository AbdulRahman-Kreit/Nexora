"use client";
import React, { useState, useEffect } from 'react';

export default function RealTimeDate() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="text-[16px] text-gray-500 mb-5 font-grotesk">
            {formatDate(currentDate)}
        </div>
    );
}