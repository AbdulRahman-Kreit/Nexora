"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const statisData = [
    { id: 1, title: "Revenue", value: "$78.26M" },
    { id: 2, title: "Profit", value: "$54.15M" },
    { id: 3, title: "Cost", value: "$24.45M" },
    { id: 4, title: "QTY", value: "214K" },
];

function AnimatedNumber({ value } : { value: string }) {
    const [mounted, setMounted] = useState(false);

    const numericValue = parseFloat(value.toString().replace(/[^0-9.-]+/g,""));
    const count = useMotionValue(0);
    const hasDecimals = value.includes(".");

    const displayValue = useTransform(count, (latest) => {
        const formattedValue = hasDecimals ? latest.toFixed(2) : 
        Math.round(latest);

        return value.replace(/[0-9.,]+/, formattedValue.toLocaleString());
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMounted(true);
        }, 0);
        

        const animation = animate(count, numericValue, {
            duration: 2,
            ease: "easeInOut",
        });

        return () => {
            clearTimeout(timeout);
            animation.stop()
        };
    }, [numericValue, count]);

    if (!mounted) return <span>{value}</span>;

    return <motion.span>{displayValue}</motion.span>;
}

export default function Statistics() {
    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3
        h-fit`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    w-[110px] pl-3 border-l-3 border-[#4a7fce]`}>
                        <h3 className='text-md font-mideum text-gray-500'>
                            {data.title}
                        </h3>
                        <p className='text-2xl font-mideum'>
                            <AnimatedNumber value={data.value} />
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
