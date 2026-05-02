"use client";
import React, { useState, useEffect } from "react";
import AnimatedNumbers from '@/components/general-components/AnimatedNumbers'
import { fetchFromAPI } from "@/data/fetchFromAPI";

export default function Statistics() {
    const [stats, setStats] = useState<any>({});
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });

        return () => observer.disconnect();
    }, []);
        
    useEffect(() => {
        fetchFromAPI('Employee Analysis/Summary').then(data => {
            setStats(data || {});
        }).catch(error => {
            console.error(`API Error: ${error}`);
        })
    }, []);
    
    const statisData = [
        { id: 1, title: "Employees", value: stats.employees },
        { id: 2, title: "Customers", value: stats.customers  },
        { id: 3, title: "Orders", value: stats.orders },
        { id: 4, title: "Total Commission", value: stats.total_commision },
    ];
    

    return (
        <div className={`flex flex-row justify-between font-grotesk max-w-2/3 h-fit transition-colors duration-300`}>
            {statisData.map((data) => {
                return (
                    <div key={data.id} className={`flex flex-col justify-start 
                    w-[200px] pl-3 mr-8 border-l-3 border-[#4a7fce]`}>
                        
                        <h3 className='text-sm font-medium text-(--alt-text-color) uppercase tracking-wider mb-2'>
                            {data.title}
                        </h3>

                        <div className="flex flex-row gap-4">
                            <p className='text-2xl font-semibold text-(--main-text-color)'>
                                <AnimatedNumbers value={data.value} />
                            </p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}