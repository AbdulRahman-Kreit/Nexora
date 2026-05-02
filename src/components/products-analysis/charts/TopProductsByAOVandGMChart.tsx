/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, LineController, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopProductsbyAOVandGMSkeleton from '../skeletal-loading/TopProductsbyAOVandGMSkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useFilter } from '@/contexts/FilterProvider';

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

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

export default function TopProductByAOVandGMChart() {
    const { days } = useFilter(); 
    const searchParams = useSearchParams();
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
        fetchFromAPI('topProductsAovGm', { 
            region, 
            days 
        }).then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, [region, days]); 
    
    if (loading) return <TopProductsbyAOVandGMSkeleton />;

    const handleChageBarColors = chartData.map(() => {
        return barColors[Math.floor(Math.random() * barColors.length)];
    });

    const labelColor = isDarkMode ? '#ffffff' : '#006fff';

    const data = {
        labels: chartData.map(item => item.product_name),
        datasets: [
            {
                type: 'line' as const,
                label: 'GM%',
                data: chartData.map(item => { 
                    if (item.gm_percent != 0) {
                        return parseFloat(item.gm_percent).toFixed(1);
                    }
                    return 0;
                }),
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
                label: 'AOV',
                data: chartData.map(item => item.aov),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 30,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top' as const,
                    anchor: 'end' as const,
                    color: labelColor,
                    formatter: (value: any) => {
                        const intValue = parseInt(value);
                        if (intValue >= 1000000) {
                            return (intValue / 1000000).toFixed(1) + 'M';
                        } else if (intValue >= 1000) {
                            return (intValue / 1000).toFixed(1) + 'K';
                        }
                        return intValue;
                    },
                    font: { weight: 600 as const, size: 14 },
                }
            },
        ]
    };

    const options = {
            responsive: true,
            maintainAspectRatio: false,
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
                    },
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: {
                            weight: 600 as const,
                            size: 14
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
                    grid: { display: false },
                    ticks: {
                        color: '#006fff',
                        font: {
                            weight: 600 as const,
                            size: 12
                        }, 
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
                Top 10 Products by AOV & GM%
            </h2>
            <div className="h-full w-full py-5">
                <Bar 
                    key={`top-products-aov-gm-${region}-${days}-${isDarkMode}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    )
}