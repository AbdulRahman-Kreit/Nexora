"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from "chart.js";
import { Bar } from "react-chartjs-2";

import RevenueAndGMSkeleton from "../skeletal-loading/RevenueAndGMSkeleton";
import { fetchFromAPI } from "@/data/fetchFromAPI";

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
        fetchFromAPI('Revenue Over Time').then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, []);

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
                yAxisID: 'y'
            },
            {
                label: 'GM %',
                type: 'line', 
                data: chartData.map(item => parseFloat(item.gm_percent)),
                borderColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 5,           
                pointHoverRadius: 8,      
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#ffffff', 
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
                    font: {
                        weight: 600,
                        size: 14
                    },
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
                    font: {
                        weight: 600,
                    },
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
                    drawBorder: false
                },
                ticks: {
                    color: '#006fff',
                    font: {
                        weight: 600,
                    },
                    padding: 10,
                    maxRotation: 0,
                    autoSkip: false,
                },
            }
        },
        layout: {
            padding: {
                bottom: 10,
                left: 10,
                right: 10,
                top: 0,
            }
        }
    };

    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Revenue and GM% Over Time
            </h2>
            <div className="h-full w-full py-5">
                <Bar key="revenue-gm-bar-chart" data={data} options={options as any} />
            </div>
        </div>
    );
}