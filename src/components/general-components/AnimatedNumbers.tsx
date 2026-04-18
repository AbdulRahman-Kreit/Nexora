"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedNumbers({ value }: { value: string | number }) {
    const [mounted, setMounted] = useState(false);

    const rawString = String(value ?? "0");
    const numericValue = parseFloat(rawString.replace(/[^0-9.-]+/g, "")) || 0;
    
    const count = useMotionValue(0);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    const displayValue = useTransform(count, (latest) => {
        const formatted = formatNumber(latest);
        return rawString.replace(/[0-9.,]+/, formatted);
    });

    useEffect(() => {
        setMounted(true);
        const animation = animate(count, numericValue, {
            duration: 2,
            ease: "easeInOut",
        });

        return () => animation.stop();
    }, [numericValue, count]);

    if (!mounted) return <span>{rawString}</span>;

    return <motion.span>{displayValue}</motion.span>;
}