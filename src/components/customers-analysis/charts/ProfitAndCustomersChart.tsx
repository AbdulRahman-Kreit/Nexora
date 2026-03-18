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

const customersData = [
    { region: 'Southwest', customers: 116 },
    { region: 'Canada', customers: 106 },
    { region: 'Northwest', customers: 87 },
    { region: 'Southeast', customers: 79 },
    { region: 'Central', customers: 61 },
    { region: 'Northeast', customers: 49 },
    { region: 'United Kingdom', customers: 38 },
    { region: 'Brazil', customers: 34 },
    { region: 'France', customers: 34 },
    { region: 'Germany', customers: 32 },
];

const profitData = [ 12000000, 10000000, 8000000, 5000000, 5000000, 3000000, 3000000, 1000000, 3000000, 1000000 ];

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

const handleChageBarColors = customersData.map(() => {
    return barColors[Math.floor(Math.random() * barColors.length)];
});

export default function ProfitAndCustomersChart() {
    const data = {
        labels: customersData.map(item => item.region),
        datasets: [
            {
                type: 'line' as const,
                label: 'Profit',
                data: profitData.map(item => item),
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
                    color: '#161616',
                    formatter: (value: any) => (value / 1000000) + 'M',
                    font: { weight: 600, size: 14 },
                    offset: 6,
                }
            },
            {
                type: 'bar' as const, 
                label: 'Customers',
                data: customersData.map(item => item.customers),
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
            <Bar data={data} options={options} />
        </div>
    )
}
