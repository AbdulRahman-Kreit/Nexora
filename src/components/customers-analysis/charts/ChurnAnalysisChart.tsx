"use client";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    plugins
);

const chartData = [
    { year: 2022, data: [38, 38, 38, 38] },
    { year: 2023, data: [null, 214, 160, 129] },
    { year: 2024, data: [null, null, 211, 163] },
    { year: 2025, data: [null, null, null, 172] },
];

export default function ChurnAnalysisChart() {
    const data = {
        labels: chartData.map(item => item.year), 
        datasets: [
            {
                label: '2022',
                data: chartData[0].data, 
                backgroundColor: '#0085ff',
            },
            {
                label: '2023',
                data: chartData[1].data, 
                backgroundColor: '#69b4ff',
            },
            {
                label: '2024',
                data: chartData[2].data, 
                backgroundColor: '#e0ffff',
            },
            {
                label: '2025',
                data: chartData[3].data, 
                backgroundColor: '#006fff',
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
                    font: {
                        weight: 600,
                        size: 14
                    }
                    
                }
            },
            datalabels: {
                display: (context: any) => 
                    context.dataset.data[context.dataIndex] !== null,
                color: '#161616',
                font: {
                    weight: 600,
                    size: 10,
                },
                anchor: 'center',
                align: 'center'
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: { 
                    color: '#006fff',
                    font: {
                        weight: 600,
                        size: 14
                    }
                },
                padding: { bottom: 10 }
            },
            y: {
                stacked: true, 
                ticks: { display: false }
            }
        }
    };

    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Churn Analysis
            </h2>
            <Bar data={data} options={options} />
        </div>
    );
}
