/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopEmployeesSkeleton from '../skeletal-loading/TopEmployeeSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from '@/contexts/FilterProvider';

export const runtime = 'edge';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ChartDataLabels
);

export default function TopEmployeesChart() {
    const { days } = useFilter(); 
    const bgMaxValue = 10000000;
    
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchFromAPI('Top Employees', { days }).then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, [days]); 

    if (loading) return <TopEmployeesSkeleton />;

    const barFillerColor = typeof window !== 'undefined' 
        ? getComputedStyle(document.documentElement).getPropertyValue('--bar-bg-filler').trim() 
        : (isDarkMode ? '#12243b' : '#d5e7fe');

    const data = {
        labels: chartData.map(item => item.employee),
        datasets: [
            {
                label: 'Sales',
                data: chartData.map(item => item.total_sales),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 20,
                order: 1,
                animations: {
                    x: {
                        duration: 2000,
                        easing: 'easeOutQuart' as const,
                        type: 'number' as const,
                        from: (context: any) => {
                            if (context.type === 'data' && context.datasetIndex === 0) {
                                return context.chart.scales.x.getPixelForValue(0);
                            }
                            return undefined;
                        }
                    }
                },
            },
            {
                label: 'Total Sales',
                data: chartData.map(() => bgMaxValue),
                backgroundColor: barFillerColor,
                borderRadius: 5,
                barThickness: 20,
                order: 2,
                datalabels: { display: false }
            }
        ]
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        grouped: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                display: true,
                anchor: 'end' as const,
                align: 'right' as const,
                color: '#006fff',
                font: { weight: 600 as const },
                formatter: (value: number) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value;
                },
                offset: 5,
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                max: bgMaxValue 
            },
            y: {
                grid: { display: false },
                ticks: { 
                    color: '#006fff', 
                    font: { weight: 600 } 
                },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 5 }
        }
    };

    return (
        <div className="bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold mb-4 text-lg">
                Top 10 Employees by Total Sales
            </h2>
            <div className="h-full w-full pb-5">
                <Bar 
                    ref={chartRef}
                    key={`top-employees-${days}-${isDarkMode}`}
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}