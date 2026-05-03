/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, LineController, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ProfitAndCustomersSkeleton from '../skeletal-loading/ProfitAndCustomersSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider";

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

export default function ProfitAndCustomersChart() {
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
        fetchFromAPI('Region Stats', { days }).then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        });

        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [days]);
        
    if (loading) return <ProfitAndCustomersSkeleton />;

    const handleChageBarColors = chartData.map((_, index) => {
        return barColors[index % barColors.length];
    });

    const data = {
        labels: chartData.map(item => item.region),
        datasets: [
            {
                type: 'line' as const,
                label: 'Profit',
                data: chartData.map(item => Number(item.profit || 0)),
                borderColor: currentThemeColor,
                borderWidth: 2,
                pointRadius: 4, 
                pointBackgroundColor: currentThemeColor, 
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
                label: 'Customers',
                data: chartData.map(item => item.customers),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top' as const,
                    anchor: 'end' as const,
                    color: getCSSVariable('--alt-text-color') || '#ffffff',
                    font: { weight: 700, size: 13 },
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
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    font: { weight: 600, size: 13 },
                    color: currentThemeColor
                }
            },
            datalabels: {
                display: true
            }
        },
        scales: {
            y: { display: false },
            y1: {
                display: false,
                ticks: {
                    callback: (value: any) => (value / 1000000) + 'M'
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: currentThemeColor,
                    font: { weight: 600, size: 11 }, 
                    callback: function(this: any, value: any) {
                        const label = this.getLabelForValue(value);
                        return label.length > 8 ? label.substr(0, 6) + '..' : label; 
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
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold text-lg">
                Profit & Customers by Region
            </h2>
            <div className="h-full w-full py-5">
                <Bar key={`${currentThemeColor}-${days}`} data={data} options={options as any} />
            </div>
        </div>
    );
}