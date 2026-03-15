"use client";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const chartData = [
    { category: "Protien", revenue: 369000 },
    { category: "Carbs", revenue: 124000 },
    { category: "Clothing", revenue: 201000 },
    { category: "Amino Acids", revenue: 112000 },
    { category: "Vitamins", revenue: 50000 },
]

export default function RevenueByCategoryChart() {
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
                formatter: (value: any) => `${value / 1000}K`,
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
            <Bar data={data} options={options} />
        </div>
    )
}
