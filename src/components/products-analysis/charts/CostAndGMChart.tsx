"use client";
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, LineController, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

const costData = [
    { label: '0 - 1000', value: 110600000 },
    { label: '1000 - 2000', value: 10000000 },
    { label: '> 2000', value: 3100000 },
];

const gmData = [67.8, 68.8, 71.3];

export default function CostAndGMChart() {
    const data = {
        labels: costData.map(item => item.label),
        datasets: [
            {
                type: 'line' as const,
                label: 'GM%',
                data: gmData.map(item => item),
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
                    color: '#ffffff',
                    formatter: (value: any) => (value + '%'),
                    font: { weight: 600, size: 14 },
                    offset: 6,
                }
            },
            {
                type: 'bar' as const, 
                label: 'Customers',
                data: costData.map(item => item.value),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#ffffff',
                    formatter: (value: any) => (value / 1000000) + 'M',
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
                    boxWidth: 8,
                    padding: 20,
                    font: {
                        weight: 600,
                        size: 12
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
        p-4 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Cost & GM by Price Category
            </h2>
            <Bar data={data} options={options} />
        </div>
    )
}
