"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueByCountrySkeleton from '../skeletal-loading/RevenueByCountrySkeleton';
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

export default function RevenueByCountryChart() {
    const { days } = useFilter(); 
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [themeColors, setThemeColors] = useState({
        mainText: '#006fff',
        barBgFiller: '#12243b'
    });

    const bgMaxValue = Math.max(...chartData.map(item => parseFloat(item.revenue) || 0), 1000) * 1.5;

    const getCSSVariable = (variable: string) => {
        if (typeof window !== 'undefined') {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        }
        return '';
    };

    useEffect(() => {
        const updateTheme = () => {
            setThemeColors({
                mainText: getCSSVariable('--main-text-color') || '#006fff',
                barBgFiller: getCSSVariable('--bar-bg-filler') || '#12243b'
            });
        };

        updateTheme(); 

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setLoading(true); 
        fetchFromAPI('revenue-by-region(country)', { days }).then(data => {
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

    if (loading) return <RevenueByCountrySkeleton />;

    const data = {
        labels: chartData.map(item => item.country),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => parseFloat(item.revenue)),
                backgroundColor: '#006fff', 
                borderRadius: 5,
                barThickness: 25,
                order: 1,
                animations: {
                    x: {
                        duration: 2000,
                        easing: 'easeOutQuart',
                        type: 'number',
                        from: (context: any) => {
                            if (context.type === 'data' && context.datasetIndex === 0) {
                                return context.chart.scales.x.getPixelForValue(0);
                            }
                        }
                    }
                },
            },
            {
                label: 'Total Revenue Background',
                data: chartData.map(() => bgMaxValue),
                backgroundColor: themeColors.barBgFiller, 
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
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end' as const,
                align: 'right' as const,
                color: themeColors.mainText, 
                font: { weight: 600 },
                formatter: (value: number, context: any) => {
                    if (context.datasetIndex !== 0) return null;
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
                    color: themeColors.mainText, 
                    font: { weight: 600 } 
                },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 45 } 
        }
    };

    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold mb-4">
                Revenue by Country
            </h2>
            <div className="h-full w-full py-5">
                <Bar 
                    ref={chartRef}
                    key={`${themeColors.mainText}-${days}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}