"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumbers from '../general-components/AnimatedNumbers';
import { fetchFromAPI } from "@/data/fetchFromAPI";


export default function Statistics() {
    const radius = 80;
    const stroke = 10;
    const normalizedRadius = radius - stroke; 
    const circumference = normalizedRadius * 2 * Math.PI;
    const arcLength = circumference / 2; 

    const [stats, setStats] = useState<any>({});
        
        useEffect(() => {
            fetchFromAPI('Product Analysis/Summary').then(data => {
                
                setStats(data || {});
            }).catch(error => {
                console.error(`API Error: ${error}`);
            })
        }, []);

    const statisData = [
        { title: 'Growth Margin', progress: stats.gm_percent }, 
        { title: 'Cost', progress: stats.cost_percent },
        { title: 'Returns Amount', progress: stats.return_amount_percentage }, 
        { title: 'Returns Orders', progress: stats.returns_orders_percentage },
    ];

    return (
        <div className="flex flex-row justify-between p-8 font-grotesk">
            {statisData.map((data, index) => {
                const progressValue = Number(data.progress || 0); 
                const progressPercentage = progressValue / 100;
                const progressOffset = arcLength - (progressPercentage * arcLength);

                return (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <svg
                                height={radius} 
                                width={radius * 2}
                                className="overflow-visible"
                            >   
                                <defs>
                                    <filter id={`glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                <circle
                                    stroke="#c2e0ff"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    strokeDasharray={`${arcLength} ${circumference}`}
                                    strokeLinecap="round"
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                    style={{ transform: 'rotate(-180deg)', transformOrigin: '50% 100%' }}
                                />
                                
                                <motion.circle
                                    stroke="#006fff"
                                    fill="transparent"
                                    strokeWidth={stroke}
                                    strokeDasharray={`${arcLength} ${circumference}`}
                                    initial={{ strokeDashoffset: arcLength }}
                                    animate={{ strokeDashoffset: progressOffset }}
                                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    r={normalizedRadius}
                                    cx={radius}
                                    cy={radius}
                                    filter={`url(#glow-${index})`}
                                    style={{ transform: 'rotate(-180deg)', transformOrigin: '50% 100%' }}
                                />
                            </svg>

                            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
                                <span className="text-[#006fff] text-2xl font-medium [text-shadow:_0_0_20px_#006fff,_0_0_30px_#006fff]">
                                    <AnimatedNumbers value={String(data.progress)} />%
                                </span>
                            </div>
                        </div>

                        <span className="text-white text-lg font-semibold mt-4">
                            {data.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}