"use client";
import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    
);

const chartData = [
    { date: "Q1 2023", revenue: 100000 }, { date: "Q2 2023", revenue: 300000 },
    { date: "Q3 2023", revenue: 350000 }, { date: "Q4 2023", revenue: 400000 },
    { date: "Q1 2024", revenue: 100000 }, { date: "Q2 2024", revenue: 300000 },
    { date: "Q3 2024", revenue: 350000 }, { date: "Q4 2024", revenue: 400000 },
    { date: "Q1 2025", revenue: 100000 }, { date: "Q2 2025", revenue: 300000 },
    { date: "Q3 2025", revenue: 350000 }, { date: "Q4 2025", revenue: 400000 },
];

export default function RevenueAndGMChart() {
    const chartRef = useRef<ChartJS<'bar'> | null>(null);

    useEffect(() => {
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    const data = {
        labels: chartData.map(item => item.date),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => item.revenue),
                backgroundColor: chartData.map(item => {
                    if (item.date.includes("Q1")) return '#69b4ff';
                    else if (item.date.includes("Q2")) return '#0085ff';
                    else if (item.date.includes("Q3")) return '#006fff';
                    else if (item.date.includes("Q4")) return '#006fff';
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
                    callback: (value: any) => `${value / 1000}K`,
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