"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, LineController, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueAndProfitSkeleton from '../skeletal-loading/RevenueAndProfitSkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function RevenueAndProfitChart() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || '';
    const region = searchParams.get('region') || '';

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
        fetchFromAPI('Revenue & Profit By Category', category, region).then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, [category, region]); 
    
    if (loading) return <RevenueAndProfitSkeleton />;

    const labelColor = isDarkMode ? '#ffffff' : '#006fff';

    const data = {
        labels: chartData.map(item => item.category),
        datasets: [
            {
                type: 'line' as const,
                label: 'Profit',
                data: chartData.map(item => Number(item.profit)),
                borderColor: labelColor,
                borderWidth: 2,
                pointRadius: 4, 
                pointBackgroundColor: labelColor, 
                pointHoverRadius: 6, 
                fill: false,
                tension: 0.4, 
                order: 1,
                yAxisID: 'y1',
                datalabels: {
                    display: false,
                }
            },
            {
                type: 'bar' as const, 
                label: 'Revenue',
                data: chartData.map(item => Number(item.revenue)),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top' as const, 
                    anchor: 'end' as const,
                    color: labelColor, 
                    formatter: (value: any) => {
                        const num = Number(value);
                        return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toFixed(0);
                    },
                    font: { weight: 600 as const, size: 14 },
                    offset: 2, 
                }
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20 
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart' as const,
        },
        animations: {
            y: {
                duration: 2000,
                easing: 'easeOutQuart' as const,
                type: 'number' as const,
                from: (context: any) => {
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 20,
                    font: {
                        weight: 600 as const,
                        size: 12
                    },
                    color: '#006fff'
                }
            },
            datalabels: {
                display: true
            }
        },
        scales: {
            y: {
                display: false,
                beginAtZero: true,
            },
            y1: {
                display: false,
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => (value / 1000000) + 'M'
                }
            },
            x: {
                display: false,
                ticks: {
                    color: '#006fff',
                    font: {
                        weight: 600 as const,
                        size: 12
                    }
                }
            }
        },   
    };
    
    return (
        <div className="bg-main-gradient ml-1 p-4 h-96 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold uppercase tracking-wider text-sm">
                Revenue & Profit by Price Category 
            </h2>
            <div className="h-full w-full py-5">
                <Bar 
                    key={`revenue-profit-chart-${category}-${region}-${isDarkMode}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    )
}