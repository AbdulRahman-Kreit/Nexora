/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueByCategorySkeleton from '../skeletal-loading/RevenueByCategorySkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function RevenueByCategoryChart() {
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        
        useEffect(() => {
            const chart = chartRef.current;
            return () => {
                if (chart) {
                    chart.destroy();
                }
            };
        }, []);

        
    
        useEffect(() => {
            fetchFromAPI('Revenue By Category').then(data => {
                setchartData(data);
                setLoading(false);
            }).catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            })
        }, []);

    if (loading) return <RevenueByCategorySkeleton />;
    
    const data = {
        labels: chartData.map(item => item.category),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => item.revenue),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 40,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
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
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: { display: false, },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#006fff',
                font: { weight: 600 },
                formatter: (value: any) => {
                    const num = parseFloat(value);
                    return num >= 10000 ? `${num / 1000}K` : num;
                },
                offset: 1,
            },
        },
        scales: {
            y: {
                display: false, 
                grid: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#cbd5e1', font: { size: 10 } }
            }
        },
        layout: {
            padding: {
                bottom: 20,
                left: 10,
                right: 10,
                top: 20,
            }
        }
    };
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Revenue by Category
            </h2>
            <div className="h-full w-full py-5">
                <Bar 
                    key="revenue-by-category-bar-chart"
                    data={data} 
                    options={options} />
            </div>
        </div>
    )
}
