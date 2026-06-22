/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import OrderReturnsBySubcategorySkeleton from '../skeletal-loading/OrderReturnsBySubcategorySkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useFilter } from "@/contexts/FilterProvider";

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

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

export default function OrderReturnsBySubcategoryChart() {
    const { days } = useFilter();
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

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
        fetchFromAPI('By Subcategory', { days }).then(data => {
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

    if (loading) return <OrderReturnsBySubcategorySkeleton />;

    const labelTextColor = isDarkMode ? '#cbd5e1' : '#006fff';

    const data = {
        labels: chartData.map(item => item.subcategory),
        datasets: [
            {
                label: 'Order Returns',
                data: chartData.map(item => item.returns),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 30,
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
                font: { weight: 600, size: 12 },
                offset: 4,
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
                    font: { size: 12, weight: 600 },
                    callback: function(this: any, value: any) {
                        const label = this.getLabelForValue(value);
                        return label.length > 8 ? label.substr(0, 8) + '..' : label; 
                    },
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 5,
                    autoSkip: false,
                }
            }
        },
        layout: {
            padding: {
                top: 25
            }
        }
    };

    return (
        <div className="bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold text-lg">
                Order Returns by Subcategory
            </h2>
            <div className="min-h-75 w-full py-5">
                <Bar 
                    ref={chartRef}
                    key={`${isDarkMode ? 'dark-sub' : 'light-sub'}-${days}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}