/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueByCategorySkeleton from '../skeletal-loading/RevenueByCategorySkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useFilter } from '@/contexts/FilterProvider'; 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function RevenueByCategoryChart() {
    const { days } = useFilter(); 
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentThemeColor, setCurrentThemeColor] = useState('#006fff');

    const getCSSVariable = (variable: string) => {
        if (typeof window !== 'undefined') {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        }
        return '';
    };

    useEffect(() => {
        const updateTheme = () => {
            const color = getCSSVariable('--main-text-color') || '#006fff';
            setCurrentThemeColor(color);
        };

        updateTheme(); 

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setLoading(true); 
        fetchFromAPI('Revenue By Category', { days }).then(data => { 
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [days]); 

    if (loading) return <RevenueByCategorySkeleton />;
    
    const data = {
        labels: chartData.map(item => item.category),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => item.revenue),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 40,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        animations: {
            y: {
                duration: 2000,
                easing: 'easeOutQuart',
                type: 'number',
                from: (context: any) => {
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: { display: false, },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: currentThemeColor,
                font: { weight: 600 },
                formatter: (value: any) => {
                    const num = parseFloat(value);
                    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
                    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
                    return Math.round(num);
                },
                offset: 1,
            },
        },
        scales: {
            y: {
                display: false, 
                grid: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: currentThemeColor, 
                    font: { size: 10, weight: 600 },
                    padding: 10,
                    maxRotation: 0,
                    autoSkip: false,
                    autoSkipPadding: 0,
                }
            }
        },
        layout: {
            padding: {
                bottom: 20,
                left: 10,
                right: 10,
                top: 20,
            }
        }
    };
    
    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold mb-4 text-lg">
                Revenue by Category
            </h2>
            <div className="h-full w-full py-5">
                <Bar 
                    ref={chartRef}
                    key={`${currentThemeColor}-${days}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    )
}