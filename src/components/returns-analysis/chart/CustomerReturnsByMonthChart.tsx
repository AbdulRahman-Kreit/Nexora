/* eslint-disable react-hooks/purity */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import CustomerReturnsByMonthSkeleton from '../skeletal-loading/CustomerReturnsByMonthSkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels
);

export default function CustomerReturnsByMonthChart() {
    const chartRef = useRef<ChartJS<"line">>(null);
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
        fetchFromAPI('getCustomersByMonth').then(data => {
            setchartData(data|| []);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        });
    }, []);

    if (loading) return <CustomerReturnsByMonthSkeleton />;

    const pointRingColor = isDarkMode ? '#ffffff' : '#151a21';
    const labelTextColor = isDarkMode ? '#ffffff' : '#006fff';

    const data = {
        labels: chartData.map((item) => item.month_name),
        datasets: [
            {
                label: 'Customer Returns',
                data: chartData.map((item) => item.customers_returns),
                fill: true,
                tension: 0.4,
                borderColor: '#006fff',
                borderWidth: 2,
                backgroundColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return 'transparent';
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(0, 111, 255, 0.4)'); 
                    gradient.addColorStop(1, 'rgba(0, 111, 255, 0)');
                    return gradient;
                },
                pointRadius: 6, 
                pointBackgroundColor: '#006fff',
                pointBorderColor: pointRingColor, 
                pointBorderWidth: 2,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: 'rgba(0, 111, 255, 0.8)',
                pointHoverBorderWidth: 2,
                animations: {
                    y: {
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
        animation: {
            duration: 2000,
            easing: 'easeOutQuart' as const,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
            datalabels: {
                display: true,
                align: 'top' as const,
                offset: 8,
                color: labelTextColor, 
                font: { weight: 'bold' as const }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { 
                    color: '#006fff', 
                    font: { weight: 600 },
                    callback: function(this: any, value: any) {
                        const label = this.getLabelForValue(value);
                        return label.substr(0, 3);
                    },
                    maxRotation: 0,
                    minRotation: 0,
                    padding: 10,
                    autoSkip: false,
                }
            },
            y: {
                grid: { display: false }, 
                ticks: { color: '#006fff', font: { weight: 600 } },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={`bg-main-gradient p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-gray-500 font-semibold">Customer Returns by Month</h2>
            <div className="min-h-[300px] w-full py-5">
                <Line 
                    ref={chartRef} 
                    key={isDarkMode ? 'dark' : 'light'} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}