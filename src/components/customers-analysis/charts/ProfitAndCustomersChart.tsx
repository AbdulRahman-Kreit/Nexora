/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, LineController, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ProfitAndCustomersSkeleton from '../skeletal-loading/ProfitAndCustomersSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";

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
        fetchFromAPI('Region Stats').then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, []);
        
    if (loading) return <ProfitAndCustomersSkeleton />;

    const handleChageBarColors = chartData.map(() => {
        return barColors[Math.floor(Math.random() * barColors.length)];
    });

    const data = {
        labels: chartData.map(item => item.region),
        datasets: [
            {
                type: 'line' as const,
                label: 'Profit',
                data: chartData.map(item => Number(item.profit || 0)),
                borderColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4, 
                pointBackgroundColor: '#ffffff', 
                pointHoverRadius: 6, 
                fill: false,
                tension: 0.4, 
                order: 1,
                yAxisID: 'y1',
                datalabels: {
                    align: 'bottom',
                    anchor: 'end',
                    color: '#fff0f0',
                    formatter: (value: any) => {
                        return value >= 1000000 ? (value / 1000000) + 'M' : value;
                    },
                    font: { weight: 600, size: 14 },
                    offset: 6,
                }
            },
            {
                type: 'bar' as const, 
                label: 'Customers',
                data: chartData.map(item => item.customer_count),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#ffffff',
                    font: { weight: 600, size: 14 },
                }
            },
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
            legend: {
                labels: {
                    usePointStyle: true,
                    font: {
                        weight: 600,
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
            },
            y1: {
                display: false,
                ticks: {
                    callback: (value: any) => (value / 1000000) + 'M'
                }
            },
            x: {
                ticks: {
                    color: '#006fff',
                    font: {
                        weight: 600,
                        size: 12
                    }
                }
            }
        },
    };

    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Profit & Customers by Region
            </h2>
            <div className="h-full w-full">
                <Bar key="profit-customers-chart" data={data} options={options} />
            </div>
        </div>
    )
}
