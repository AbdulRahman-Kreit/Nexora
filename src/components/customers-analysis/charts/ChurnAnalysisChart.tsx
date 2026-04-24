"use client";
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ChurnAnalysisSkeleton from '../skeletal-loading/ChurnAnalysisSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function ChurnAnalysisChart() {
    const { days } = useFilter(); 
    const [chartData, setChartData] = useState<any[]>([]);
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
        fetchFromAPI('Churn Analysis', { days })
            .then(data => {
                setChartData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            });
    }, [days]); 

    if (loading) return <ChurnAnalysisSkeleton />;

    const years = chartData.map(item => item.year);
    const colors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

    const data = {
        labels: years,
        datasets: chartData.map((sourceYear, index) => ({
            label: `${sourceYear.year}`, 
            backgroundColor: colors[index % colors.length],
            data: chartData.map(currentYear => {
                if (currentYear.year === sourceYear.year) return sourceYear.new_customers;
                const lostEntry = currentYear.lost?.find((l: any) => l.year === sourceYear.year);
                const val = lostEntry ? lostEntry.count : null;
                return val === 0 ? null : val;
            })
        }))
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
                from: (context: any) => 
                    context.type === 'data' ? 
                    context.chart.scales.y.getPixelForValue(0) : undefined,
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    color: currentThemeColor, 
                    font: { weight: 600, size: 12 }
                }
            },
            datalabels: {
                display: (context: any) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value !== null && value > 0;
                },
                color: '#161616', 
                font: { weight: 700, size: 11 },
                anchor: 'center' as const,
                align: 'center' as const
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#1e293b',
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { 
                    color: currentThemeColor, 
                    font: { weight: 600, size: 14 } 
                }
            },
            y: {
                stacked: true,
                display: false,
                grid: { display: false }
            }
        }
    };

    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold mb-4">
                Churn Analysis
            </h2>
            <div className="h-[280px] w-full py-5">
                <Bar key={`${currentThemeColor}-${days}`} data={data} options={options as any} />
            </div>
        </div>
    );
}