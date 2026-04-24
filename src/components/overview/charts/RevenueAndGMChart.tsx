"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from "chart.js";
import { Bar } from "react-chartjs-2";

import RevenueAndGMSkeleton from "../skeletal-loading/RevenueAndGMSkeleton";
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export default function RevenueAndGMChart() {
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
        fetchFromAPI('Revenue Over Time', { days }).then(data => { 
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

    if (loading) return <RevenueAndGMSkeleton />;

    const data = {
        labels: chartData.map(item => [`Q${item.quarter}`, item.year]),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => parseFloat(item.revenue)),
                backgroundColor: chartData.map(item => item.quarter === 1 ? '#69b4ff' : '#006fff'),
                borderRadius: 5,
                order: 2,
                yAxisID: 'y',
                barPercentage: 0.4,       
                categoryPercentage: 2,  
                maxBarThickness: 40,      
            },
            {
                label: 'GM %',
                type: 'line', 
                data: chartData.map(item => parseFloat(item.gm_percent)),
                borderColor: currentThemeColor,
                borderWidth: 2,
                pointRadius: 3,           
                pointHoverRadius: 8,      
                pointBackgroundColor: currentThemeColor,
                pointBorderColor: currentThemeColor, 
                pointBorderWidth: 2,
                fill: false,
                order: 1,
                yAxisID: 'y2'
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
                    if (context.type === 'data' && context.chart?.scales?.y) {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    font: { weight: 600, size: 14 },
                    color: '#006fff'
                }
            },
            datalabels: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                grid: {
                    color: '#1e293b',
                    drawTicks: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#006fff',
                    font: { weight: 600 },
                    padding: 10,
                },
            },
            y2: {
                ticks: { display: false },
                grid: { display: false },
            },
            x: {
                grid: { 
                    display: false, 
                    drawBorder: false,
                    offset: true 
                },
                ticks: {
                    color: '#006fff',
                    font: { weight: 600 },
                    padding: 10,
                    maxRotation: 0,
                    autoSkip: false,
                    autoSkipPadding: 0,
                },
            }
        },
        layout: {
            padding: { bottom: 10, left: 10, right: 10, top: 0 }
        }
    };

    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold mb-4">
                Revenue and GM% Over Time
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
    );
}