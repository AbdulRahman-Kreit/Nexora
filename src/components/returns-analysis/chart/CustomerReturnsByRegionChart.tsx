/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import CustomerReturnsByRegionSkeleton from '../skeletal-loading/CustomerReturnsByRegionSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

export default function CustomerReturnsByRegionChart() {
    const { days } = useFilter();
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
        setLoading(true);
        fetchFromAPI('By Region', { days }).then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        });
    }, [days]);

    const handleChageBarColors = useMemo(() => {
        return chartData.map(() => barColors[Math.floor(Math.random() * barColors.length)]);
    }, [chartData]);

    if (loading) return <CustomerReturnsByRegionSkeleton />;

    const labelTextColor = isDarkMode ? '#cbd5e1' : '#006fff'; 

    const data = {
        labels: chartData.map(item => item.region),
        datasets: [
            {
                label: 'Order Frequency',
                data: chartData.map(item => item.customers_with_return),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 45,
                animations: {
                    y: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                        from: (context: any) => {
                            if (context.type === 'data') {
                                return context.chart.scales.y.getPixelForValue(0);
                            }
                        }
                    }
                }
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end' as const,
                align: 'top' as const,
                color: labelTextColor, 
                font: { weight: 600, size: 14 },
                offset: 1,
            },
        },
        scales: {
            y: {
                display: false, 
                grid: { display: false },
                beginAtZero: true, 
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: '#006fff', 
                    font: { size: 14, weight: 600 },
                    callback: function(this: any, value: any) {
                        const label = this.getLabelForValue(value);
                        return label.length > 8 ? label.substr(0, 8) + '..' : label; 
                    },
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10,
                    autoSkip: false,
                }
            }
        },
    };

    return (
        <div className="bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold text-sm">
                Customer Returns by Region
            </h2>
            <div className="h-[320px] w-full pt-8 pb-5">
                <Bar 
                    ref={chartRef}
                    key={`${isDarkMode ? 'dark-region' : 'light-region'}-${days}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}