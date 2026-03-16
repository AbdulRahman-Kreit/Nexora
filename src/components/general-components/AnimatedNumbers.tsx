"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedNumbers({ value } : { value: string }) {
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