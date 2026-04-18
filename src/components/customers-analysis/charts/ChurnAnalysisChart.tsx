"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ChurnAnalysisSkeleton from '../skeletal-loading/ChurnAnalysisSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function ChurnAnalysisChart() {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchFromAPI('Churn Analysis')
            .then(data => {
                setChartData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            });
    }, []);

    const data = useMemo(() => {
        if (chartData.length === 0) return { labels: [], datasets: [] };

        const years = chartData.map(item => item.year);
        const colors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

        return {
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
    }, [chartData]);

    if (loading) return <ChurnAnalysisSkeleton />;

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
                    color: '#006fff',
                    font: { weight: 600, size: 12 }
                }
            },
            datalabels: {
                // 3. منع ظهور رقم 0 فوق الأعمدة (يظهر فقط القيم > 0)
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
                ticks: { color: '#006fff', font: { weight: 600, size: 14 } }
            },
            y: {
                stacked: true,
                display: false,
                grid: { display: false }
            }
        }
    };

    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] ml-1 p-6 h-96 border-l-3 border-[#4a7fce]">
            <h2 className="text-gray-500 font-semibold mb-4">
                Churn Analysis
            </h2>
            <div className="h-[280px] w-full py-5">
                <Bar key="churn-chart" data={data} options={options} />
            </div>
        </div>
    );
}