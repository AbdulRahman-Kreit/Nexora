/* eslint-disable react-hooks/purity */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopProductsbyTotalOrdersSkeleton from '../skeletal-loading/TopProductsbyTotalOrdersSkeleton';
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

export default function TopProductsbyTotalOrdersChart() {
    const { days } = useFilter();
    const searchParams = useSearchParams();
    const region = searchParams.get('region') || '';

    const bgMaxValue = 5000;
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
        
        fetchFromAPI('Top Products', { 
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

    if (loading) return <TopProductsbyTotalOrdersSkeleton />;

    const barBgColor = isDarkMode ? '#12243c' : '#d5e7fe';
    const labelColor = isDarkMode ? '#ffffff' : '#006fff';

    const data = {
        labels: chartData.map(item => item.product),
        datasets: [
            {
                label: 'Top Product',
                data: chartData.map(item => item.revenue),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 25,
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
                }
            },
            {
                label: 'Background Bar',
                data: chartData.map(() => bgMaxValue),
                backgroundColor: barBgColor,
                borderRadius: 5,
                barThickness: 25,
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
        animation: {
            duration: 2000,
            easing: 'easeOutQuart' as const,
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end' as const,
                align: 'right' as const,
                color: labelColor,
                font: { weight: 600 as const },
                formatter: (value: any) => {
                    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : parseInt(value);
                },
                offset: 5,
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                max: bgMaxValue,
            },
            y: {
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
                    autoSkip: false,
                },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 35 }
        }
    }
    
    return (
        <div className="bg-main-gradient ml-1 p-6 h-2/3 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold mb-0 text-sm">
                Top 10 Products by Total Orders
            </h2>
            <div className="h-[calc(100%-40px)] w-full mt-0">
                <Bar 
                    key={`top-orders-chart-${region}-${days}-${isDarkMode}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    )
}