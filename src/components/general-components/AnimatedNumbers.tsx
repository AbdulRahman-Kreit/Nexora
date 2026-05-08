"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedNumbers({ value }: { value: string | number }) {
    const [mounted, setMounted] = useState(false);

    const { rawString, numericValue } = useMemo(() => {
        const str = String(value ?? "0");
        const num = parseFloat(str.replace(/[^0-9.-]+/g, "")) || 0;
        return { rawString: str, numericValue: num };
    }, [value]);
    
    const count = useMotionValue(0);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    };

    const displayValue = useTransform(count, (latest) => {
        const formatted = formatNumber(latest);
        return rawString.replace(/[0-9.,]+/, formatted);
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
        });

        const animation = animate(count, numericValue, {
            duration: 1.5,
            ease: "easeOut",
        });

        return () => {
            cancelAnimationFrame(frame);
            animation.stop();
        };
    }, [numericValue, count]);

    return (
        <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>
            {!mounted ? rawString : displayValue}
        </motion.span>
    );
}