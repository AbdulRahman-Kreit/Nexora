"use client";
import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

import RevenueAndGMSkeleton from "../skeletal-loading/RevenueAndGMSkeleton";
import { fetchFromAPI } from "@/data/fetchFromAPI";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        labels: chartData.map(item => item.period),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => parseFloat(item.revenue)),
                backgroundColor: chartData.map(item => {
                    const period = item.period || "";
                    if (period.includes("Q1")) return '#69b4ff';
                    else if (period.includes("Q2")) return '#0085ff';
                    else if (period.includes("Q3")) return '#006fff';
                    return '#006fff';
                }),
                borderRadius: 5,
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
            legend: { display: false, },
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
                    // callback: (value: any) => `${value / 1000}K`,
                    padding: 10,
                },
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
            <div className="h-full w-full">
                <Bar key="revenue-gm-bar-chart" data={data} options={options} />
            </div>
        </div>
    );
}