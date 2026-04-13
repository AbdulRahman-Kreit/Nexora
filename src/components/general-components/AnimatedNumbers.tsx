"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedNumbers({ value }: { value: string | number }) {
    const [mounted, setMounted] = useState(false);

    // تحويل القيمة إلى نص فوراً لضمان عمل includes و replace
    const stringValue = String(value ?? "0");
    
    // استخراج الرقم فقط للعمليات الحسابية
    const numericValue = parseFloat(stringValue.replace(/[^0-9.-]+/g, "")) || 0;
    
    const count = useMotionValue(0);
    const hasDecimals = stringValue.includes(".");

    const displayValue = useTransform(count, (latest) => {
        const formattedValue = hasDecimals 
            ? latest.toFixed(2) 
            : Math.round(latest).toLocaleString();

        return stringValue.replace(/[0-9.,]+/, formattedValue);
    });

    useEffect(() => {
        setMounted(true);
        const animation = animate(count, numericValue, {
            duration: 2,
            ease: "easeInOut",
        });

        return () => animation.stop();
    }, [numericValue, count]);

    if (!mounted) return <span>{stringValue}</span>;

    return <motion.span>{displayValue}</motion.span>;
}